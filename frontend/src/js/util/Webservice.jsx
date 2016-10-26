/*
Provides functionality for communicating with the webservices.
*/
import { hashHistory } from 'react-router'
import 'fetch';
export default {
  _AUTH_COOKIE_NAME: 'TOKEN',

  /*
  Use this for all webservice communication that requires authentication.
  Fetch wrapper. Functions identically to fetch, but provides Authentication
  headers if user's credentials are known. If authentication headers are not
  present or are invalid, redirects to the login page. Also provides headers
  to set the content and accept type to JSON.

  input and init function identically to the fetch parameters, except:
    init.headers will always be set to contain the authentication headers,
      content type and accept will always be set to application/json,


  Returns a promise, just like normal fetch. Will be rejected if
  authentication failed, with the value set to a string describing the
  rejection reason.
  */
  authFetch: function(input, init) {
    //check if authentication is present
    var authValue = this._getSavedAuthValueFromCookie();
    if (authValue) {
      init.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': authValue
      }
      return fetch(input, init).then(function(response) {
        if (response.status == 401 || response.status == 403) {
          return Promise.reject("User's credentials are invalid.");
        }
        return response;
      });
    } else {
      //redirect to login
      hashHistory.push('/auth/login');
      return Promise.reject('User is not logged in.');
    }
  },

  /*
  Attempts to login using the provided username and password. If
  successful, updates the logged in user info in the flux store.

  Returns a promise that may be rejected.
  The rejection value contains the error message explaining why login failed.
  The fulfillment value is true iff login succeeded.
  */
  login: function(username, password) {
    return fetch('/api/users/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({'username': username, 'password': password})
    }).then(function(response) {
      if (!response.ok) {
        return Promise.reject('Error occurred trying to communicate with the login service.');
      } else {
        return response.json();
      }
    }).then(function(loginSuccess) {
      if (loginSuccess) {
        //store the base-64 encoded string in a cookie for 14 days for
        //future authenticated calls
        this._saveCredentialCookie(username, password);
        return true;
      } else {
        return Promise.reject('Invalid username / password combination.');
      }
    }.bind(this));
  },

  /*
  Attempts to register using the provided email and password.

  Returns a promise that may be rejected.
  The rejection value contains the error message explaining why registration failed.
  The fulfillment value is true iff registration succeeded.
  Automatically logs the user in iff registration succeeded.
  */
  register: function(email, password) {
    return fetch('/api/users', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({'email': email, 'password': password})
    }).then(function(response) {
      if (!response.ok) {
        return Promise.reject('Error occurred trying to communicate with the registration service.');
      } else {
        return response.json();
      }
    }).then(function(registrationMessage) {
      if (registrationMessage.length == 0) {
        //store the base-64 encoded string in a cookie for 14 days for
        //future authenticated calls
        this._saveCredentialCookie(email, password);
        return true;
      } else {
        return Promise.reject(registrationMessage);
      }
    }.bind(this));
  },

  /*
  If user is logged in, returns their username. If not, returns null.
  */
  getLoggedInUsername: function() {
    if (document.cookie){
      var a = document.cookie;
      var headerValue = a.substring(
        a.search(this._AUTH_COOKIE_NAME + '=') + this._AUTH_COOKIE_NAME.length + 1);
      var userPassword = atob(headerValue);
      return userPassword.split(":")[0];
    }
    return null;
  },

  //saves the credentials in a JS cookie for 14 days.
  _saveCredentialCookie: function(username, password) {
    var a = new Date();
    a = new Date(a.getTime() +1000*60*60*24*14);
    document.cookie = this._AUTH_COOKIE_NAME + '=' + btoa(username + ':' + password) + '; expires='+a.toGMTString()+';';
  },

  //returns the auth value saved in the cookie. Will look like
  //'Basic 89gfdsgfds890'
  //This value should be supplied for the "Authorization" header to
  //make authenticated requests. Returns null if the value
  //is not set
  _getSavedAuthValueFromCookie: function() {
    if (document.cookie){
      var a = document.cookie;
      var headerValue = a.substring(
        a.search(this._AUTH_COOKIE_NAME + '=') + this._AUTH_COOKIE_NAME.length + 1);
      return 'Basic ' + headerValue;
    }
    return null;
  }
}
