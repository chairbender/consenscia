/*
Holds the Flux actions for consensus
*/

/*
Log in to the app and save the logged in username and password to
use for authenticating further calls and displaying the
logged in user's name
*/
export const login = (username, password) => {
  return {
    type: 'LOGIN',
    username,
    password
  }
}
