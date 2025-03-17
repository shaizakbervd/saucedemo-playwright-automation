import { TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { formatDate } from './testHelper';

/**
 * Generate a custom HTML report
 * @param testInfo - Test information
 * @param testResults - Test results data
 */
export async function generateCustomReport(testInfo: TestInfo, testResults: any): Promise<void> {
  const reportDir = path.join(testInfo.project.outputDir, 'custom-reports');
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  const reportPath = path.join(reportDir, `report-${formatDate()}.html`);
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Custom Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 10px; text-align: center; }
        .test-case { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
        .pass { background-color: #dff0d8; }
        .fail { background-color: #f2dede; }
        .screenshot { max-width: 800px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>SauceDemo Automation Test Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
      </div>
      <div class="content">
        <h2>Test Results</h2>
        ${generateTestResultsHTML(testResults)}
      </div>
    </body>
    </html>
  `;
  
  fs.writeFileSync(reportPath, htmlContent);
  console.log(`Custom report generated at: ${reportPath}`);
}

/**
 * Generate HTML for test results
 * @param testResults - Test results data
 * @returns HTML string
 */
function generateTestResultsHTML(testResults: any): string {
  let html = '';
  
  for (const test of testResults) {
    const status = test.status === 'passed' ? 'pass' : 'fail';
    
    html += `
      <div class="test-case ${status}">
        <h3>${test.title}</h3>
        <p><strong>Status:</strong> ${test.status}</p>
        <p><strong>Duration:</strong> ${test.duration}ms</p>
        ${test.error ? `<p><strong>Error:</strong> ${test.error}</p>` : ''}
        ${test.screenshot ? `<img class="screenshot" src="${test.screenshot}" alt="Test Screenshot">` : ''}
      </div>
    `;
  }
  
  return html;
}

/**
 * Export test results to JSON
 * @param testInfo - Test information
 * @param testResults - Test results data
 */
export async function exportTestResultsToJSON(testInfo: TestInfo, testResults: any): Promise<void> {
  const reportDir = path.join(testInfo.project.outputDir, 'custom-reports');
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }
  
  const jsonPath = path.join(reportDir, `results-${formatDate()}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(testResults, null, 2));
  console.log(`JSON results exported to: ${jsonPath}`);
} 