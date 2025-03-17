export const TestData = {
  baseUrl: 'https://www.saucedemo.com/v1/',
  validCredentials: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  invalidCredentials: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  errorMessages: {
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.'
  },
  checkoutInfo: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  }
}; 