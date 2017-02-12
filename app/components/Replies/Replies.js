import React, {PropTypes} from 'react'
import { avatar, replyContainer, header,
         cushion, center, author
} from './styles.css'
import { formatTimeStamp } from 'helpers/utils'
import { errorMsg, subHeader } from 'sharedStyles/styles.css'

Replies.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  replies: PropTypes.object.isRequired,
}

function Reply ({comment}) {
  return (
    <div className={replyContainer}>
      <img src={comment.avatar} alt={comment.name} className={avatar} />
      <div>
        <div className={author}>{comment.name}</div>
        <div className={cushion}>{formatTimeStamp(comment.timestamp)}</div>
        <div className={cushion}>{comment.reply}</div>
      </div>
    </div>
  )
}

export default function Replies ({isFetching, error, replies}) {

  const replyIds = Object.keys(replies)

  return (
    <div>
    { error
    ? <h3 className={errorMsg}>{error}</h3>
    : null
    }
    { isFetching === true
    ? <p className={subHeader}>{'Fetching Replies'}</p>
    : <div>
        <h1 className={subHeader}>{'Replies'}</h1>
        {replyIds.map((replyId) => (
          <Reply key={replyId} comment={replies[replyId]} />
        ))}
      </div>
    }
    {replyIds.length == 0
    ? <h3 className={center}>{'Be the first to comment'}</h3>
    : null
    }
    </div>
  )

}