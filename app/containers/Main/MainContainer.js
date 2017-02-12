import React, {Component, PropTypes} from 'react'
import { bindActionCreators } from 'redux'
import {Navigation} from 'components'
import {connect} from 'react-redux'
import {container, innerContainer} from './styles.css'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'

class MainContainer extends Component {

  componentDidMount () {
    if (this.props.isAuthed === true) {
      this.props.setUsersLikes()
    }
  }

  componentWillReceiveProps (nextProps) {
    if(this.props.isAuthed !== nextProps.isAuthed) {
      this.props.setUsersLikes()
    }
  }

  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  setUsersLikes: PropTypes.func.isRequired,
}

export default connect(
  ({users}) => ({isAuthed: users.isAuthed}),
  (dispatch) => bindActionCreators(usersLikesActionCreators, dispatch)
)(MainContainer)
