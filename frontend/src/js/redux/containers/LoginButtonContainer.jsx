import { connect } from 'react-redux'
import { login } from '../actions/index.jsx'
import LoginButton from '../../react/components/LoginButton.jsx'

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSuccess: (username, password) => {
      dispatch(login(username, password))
    }
  }
}

const LoginButtonContainer = connect(
  null,
  mapDispatchToProps
)(LoginButton)

export default LoginButtonContainer
