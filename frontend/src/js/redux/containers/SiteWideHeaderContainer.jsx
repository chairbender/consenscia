/*
Contains a site wide header. Passes the logged in user name to its props
so it can be rendered.
 */
import { connect } from 'react-redux'
import SiteWideHeader from '../../react/components/SiteWideHeader.jsx'

const mapStateToProps = (state) => {
  return {
    username: state.user.username
  }
}
const SiteWideHeaderContainer = connect(
  mapStateToProps
)(SiteWideHeader)

export default SiteWideHeaderContainer
