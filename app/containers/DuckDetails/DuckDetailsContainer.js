import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { DuckDetails } from 'components'
import * as ducksActionCreators from 'redux/modules/ducks'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesCountActionCreators from 'redux/modules/replies'
import { bindActionCreators } from 'redux'

class DuckDetailsContainer extends Component {

  componentDidMount () {
    this.props.initLikeCountFetch(this.props.duckId)
    if (this.props.duckAlreadyFetched === false) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  }

  render () {
    return (
      <DuckDetails
        addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        isFetching={this.props.isFetching}
        error={this.props.error} />
    )
  }
}

DuckDetailsContainer.propTypes = {
  authedUser: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckAlreadyFetched: PropTypes.bool.isRequired,
  removeFetching: PropTypes.func.isRequired,
  fetchAndHandleDuck: PropTypes.func.isRequired,
  initLikeCountFetch: PropTypes.func.isRequired,
  addAndHandleReply: PropTypes.func.isRequired,
}

function mapStateToProps ({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.get('isFetching') || likeCount.isFetching,
    error: ducks.get('error'),
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks.get(props.routeParams.duckId)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
                              ...likeCountActionCreators,
                              ...ducksActionCreators,
                              ...repliesCountActionCreators,
                            },
                              dispatch)
}

export default connect(mapStateToProps,
                       mapDispatchToProps)(DuckDetailsContainer)
