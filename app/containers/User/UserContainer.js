import React, {Component, PropTypes} from 'react'
import { User } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'
import * as usersDucksActionCreators from 'redux/modules/usersDucks'
import { staleDucks, staleUser } from 'helpers/utils'

class UserContainer extends Component {

  componentDidMount () {
    const uid = this.props.routeParams.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdatedUser)) {
      this.props.fetchAndHandleUser(uid)
    }

    if (this.props.noUser === true || staleDucks(this.props.lastUpdatedDucks)) {
      this.props.fetchAndHandleUsersDucks(uid)
    }
  }

  render () {
    return (
      <User
        noUser={this.props.noUser}
        name={this.props.name}
        isFetching={this.props.isFetching}
        error={this.props.error}
        duckIds={this.props.duckIds} />
    )
  }
}

UserContainer.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
  fetchAndHandleUser: PropTypes.func.isRequired,
  fetchAndHandleUsersDucks: PropTypes.func.isRequired,
  lastUpdatedDucks: PropTypes.number.isRequired,
  lastUpdatedUser: PropTypes.number.isRequired,
}

function mapStateToProps ({users, usersDucks}, props) {
  const specificUserDucks = usersDucks[props.routeParams.uid]
  const user = users[props.routeParams.uid]
  const noUser = typeof user === 'undefined'

  return {
    noUser,
    name: noUser ? '' : user.info.name,
    isFetching: users.isFetching || usersDucks.isFetching,
    error: users.error || usersDucks.error,
    duckIds:  specificUserDucks ? specificUserDucks.duckIds : [],
    lastUpdatedUser: user ? user.lastUpdated : 0,
    lastUpdatedDucks: specificUserDucks ? specificUserDucks.lastUpdated : 0,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersDucksActionCreators,
  }, dispatch)
}

export default connect(mapStateToProps,
                       mapDispatchToProps)(UserContainer)
