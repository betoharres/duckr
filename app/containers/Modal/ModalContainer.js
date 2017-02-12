import React, {Component} from 'react'
import {Modal} from 'components'
import {bindActionCreators} from 'redux'
import * as modalActionsCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'
import {connect} from 'react-redux'

function mapStateToProps({users, modal}) {
  const duckTextLength = modal.duckText.length
  return {
    user: users[users.authedId] ? users[users.authedId] : {},
    duckText: modal.duckText,
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...modalActionsCreators, ...ducksActionCreators}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
