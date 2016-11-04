/*
Holds the Flux actions for consensus
*/

/*

*/

/**
 * [login Log in to the app and save the logged in username for displaying the
 logged in user's name throughout the site]
 * @param  {string} username username to use
 * @return {action}          an action for logging in with the
*                                specified credentials
 */
export const login = (username) => {
  return {
    type: 'LOGIN',
    username
  }
}
