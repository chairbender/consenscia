//reducer for tracking state related to the current user

const consensusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.username,
        password: action.password
      }

    default:
      return state
  }
}


export default consensusReducer
