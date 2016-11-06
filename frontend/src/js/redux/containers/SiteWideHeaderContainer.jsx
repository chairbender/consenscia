/*
Contains a site wide header. Passes the logged in user name to its props
so it can be rendered. Provides the onLogoutSuccess callback to be
called when a logout is performed so the credentials can be cleared from
the store.
 */
import { connect } from 'react-redux'
import { logout } from '../actions/index.jsx'
import SiteWideHeader from '../../react/components/structure/SiteWideHeader.jsx'

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutSuccess: () => {
      dispatch(logout())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username
  }
}
const SiteWideHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteWideHeader)

export default SiteWideHeaderContainer
