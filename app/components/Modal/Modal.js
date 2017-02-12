import React, {PropTypes} from 'react'
import { default as ReactModal } from 'react-modal'
import { newDuckTop, pointer, newDuckInputContainer,
         newDuckInput, submitDuckBtn, darkBtn } from './styles.css'
import { formatDuck } from 'helpers/utils'

Modal.propTypes = {
  duckText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateDuckText: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  duckFanOut: PropTypes.func.isRequired,
}

const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0,
  },
}

export default function Modal (props) {
  function submitDuck() {
    props.duckFanOut(formatDuck(props.duckText, props.user.info))
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'Duck'}
      <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
        <div className={newDuckTop}>
          <span>{'Compose new Duck'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={(e) => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
            {'Duck'}
        </button>
      </ReactModal>
    </span>
  )

}
