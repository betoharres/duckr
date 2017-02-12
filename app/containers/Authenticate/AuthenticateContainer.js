import React, {Component, PropTypes} from 'react'
import {Authenticate} from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {

  async handleAuth () {
    try {
      const authAction = await this.props.fetchAndHandleAuthedUser()
      this.context.router.replace('feed')
    } catch (err) {
      console.warn('Error on hadleAuth method', err)
    }
  }

  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={() => this.handleAuth()} />
    )
  }
}

AuthenticateContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  fetchAndHandleAuthedUser: PropTypes.func.isRequired,
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

function mapStateToProps ({users}) {
  return {
    isFetching: users.isFetching,
    error: users.error,
  }
}

export default connect(mapStateToProps,
                       mapDispatchToProps
                      )(AuthenticateContainer)
