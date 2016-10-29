/*
Holds the Flux actions for consensus
*/

/*

*/

/**
 * [login Log in to the app and save the logged in username and password to
 use for authenticating further calls and displaying the
 logged in user's name]
 * @param  {string} username username to use
 * @param  {string} password plaintext password to use
 * @return {action}          an action for logging in with the
*                                specified credentials
 */
export const login = (username, password) => {
  return {
    type: 'LOGIN',
    username,
    password
  }
}
