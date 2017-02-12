import React, {PropTypes} from 'react'
import {centeredContainer, largeHeader, errorMsg} from 'sharedStyles/styles.css'
import {FacebookAuthButton} from 'components'

Authenticate.propTypes = {
  onAuth: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

export default function Authenticate ({error, isFetching, onAuth}) {
  return (
    <div className={centeredContainer}>
      <h1 className={largeHeader}>{'Authenticate'}</h1>
      <FacebookAuthButton onAuth={onAuth} isFetching={isFetching} />
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}
