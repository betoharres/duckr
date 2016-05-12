import React, {Component} from 'react'
import {Navigation} from 'components'
import {container, innerContainer} from './styles.css'

class MainContainer extends Component {

  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={false} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default MainContainer
