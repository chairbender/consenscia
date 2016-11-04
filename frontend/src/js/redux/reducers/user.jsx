//reducer for tracking state related to the current user

const consensusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      //store the saved plaintext username and password
      return {
        username: action.username
      }

    default:
      return state
  }
}


export default consensusReducer
