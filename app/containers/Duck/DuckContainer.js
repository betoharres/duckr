import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { Duck } from 'components'
import { bindActionCreators } from 'redux'
import * as usersLikesActions from 'redux/modules/usersLikes'

class DuckContainer extends Component {

  goToProfile (e) {
    e.stopPropagation()
    this.context.router.push('/'
                             + this.props.duck.get('uid'))
  }

  handleClick (e) {
    e.stopPropagation()
    this.context.router.push('/duckDetails/'
                             + this.props.duck.get('duckId'))
  }

  render () {
    return (
      <Duck
        goToProfile={(e) => this.goToProfile(e)}
        onClick={this.props.hideReplyBtn === true
          ? null : (e) => this.handleClick(e)}
        {...this.props} />
    )
  }
}

DuckContainer.contextTypes = {
  router: PropTypes.object.isRequired,
}

DuckContainer.propTypes = {
  duck: PropTypes.object.isRequired,
  numberOfLikes: PropTypes.number,
  isLiked: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  hideReplyBtn: PropTypes.bool.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
}

DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true,
}

function mapStateToProps({ducks, likeCount, usersLikes}, props) {
  return {
    duck: ducks.get(props.duckId),
    numberOfLikes: likeCount[props.duckId],
    isLiked: usersLikes[props.duckId] === true,
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(usersLikesActions, dispatch)
}

export default connect(mapStateToProps,
                       mapDispatchToProps
                      )(DuckContainer)
