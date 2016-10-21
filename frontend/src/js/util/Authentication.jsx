/*
Handles authentication throughout the app.

Set the credentials to use with setCredentials. Then, when making
webservice requests, use authorizationHeaderValue for the value of
the 'Authorization' header.
*/
export default {
  //null when no credentials have been set.
  //otherwise, will look like 'Basic fdfdsfsfd', i.e. the
  //value to use for the Authorization header when making requests
  //to the webservice
  authorizationHeaderValue: null,

  /*
  Sets the credentials to be used to authenticate all webservice requests
  from here on out.
  Assumes the username and password are correct.
  password should be plaintext
  */
  setCredentials: function(username, password) {
    this.authorizationHeaderValue = 'Basic ' + btoa(username + ':' + password);
  }


}
