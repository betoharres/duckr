import React, {PropTypes} from 'react'
import { errorMsg } from 'sharedStyles/styles.css'
import { userContainer, header } from './styles.css'
import { DuckContainer } from 'containers'

export default function User (props) {
  return (
    props.noUser === true
    ? <p class={header}>{'User doesn\'t exists'}</p>
    : <div>
        {props.isFetching === true
        ? <p className={header}>{'Loading'}</p>
        : <div>
            <div className={userContainer}>
              <div>{props.name}</div>
            </div>
            {props.duckIds.map((id) => (
              <DuckContainer duckId={id} key={id} />
            ))}
            {props.duckIds.length === 0
            ? <p className={header}>{`There's no ducks for this ${props.name.split(' ')[0]} :(`}</p>
            : null
            }
          </div>
        }
        {props.error ? <p className={errorMsg}>props.error</p> : null}
      </div>
  )

}

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  duckIds: PropTypes.array.isRequired,
}
