import React, {Component, PropTypes} from 'react'
import { Replies } from 'components'
import { connect } from 'react-redux'
import * as repliesActionCreators from 'redux/modules/replies'
import { bindActionCreators } from 'redux'
import { staleReplies } from 'helpers/utils'

class RepliesContainer extends Component {

  componentDidMount () {
    if (staleReplies(this.props.lastUpdated)) {
      this.props.fetchAndHandleMultipleReplies(this.props.duckId)
    }
  }

  render () {
    return (
      <Replies
        isFetching={this.props.isFetching}
        error={this.props.error}
        replies={this.props.replies}
        lastUpdated={this.props.lastUpdated} />
    )
  }
}

RepliesContainer.defaultProps = {
  lastUpdated: 0,
  replies: {},
}

RepliesContainer.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  replies: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  fetchAndHandleMultipleReplies: PropTypes.func.isRequired,
}

function mapStateToProps (state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {}
  const {lastUpdated, replies} = duckRepliesInfo

  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect(mapStateToProps,
                       mapDispatchToProps)(RepliesContainer)
