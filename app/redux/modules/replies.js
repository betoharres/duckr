import { postReply, fetchReplies } from 'helpers/api'

const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR'
const REMOVE_REPLY = 'REMOVE_REPLY'
const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR'

function fetchingReplies () {
  return {
    type: FETCHING_REPLIES,
  }
}

function fetchingRepliesError () {
  return {
    type: FETCHING_REPLIES_ERROR,
    error: "Error fetching replies",
  }
}


function fetchingRepliesSuccess (duckId, replies) {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    duckId,
    replies,
    lastUpdated: Date.now(),
  }
}


function addReply (duckId, reply) {
  return {
    type: ADD_REPLY,
    duckId,
    reply,
  }
}

function addReplyError () {
  return {
    type: ADD_REPLY_ERROR,
    error: 'Error adding reply',
  }
}

function removeReply (duckId, replyId) {
  return {
    type: REMOVE_REPLY,
    duckId,
    replyId,
  }
}

// Replies
const initialState = {
  isFetching: false,
  error: '',
}

const initialDuckState = {
  lastUpdated: Date.now,
  replies: {},
}

const initialReplyState = {
  replyId: '',
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
}

export function fetchAndHandleMultipleReplies (duckId) {
  return async function (dispatch) {
    dispatch(fetchingReplies())
    try {
      const replies = await fetchReplies(duckId)
      dispatch(fetchingRepliesSuccess(duckId, replies))
    }
    catch (err) {dispatch(fetchingRepliesError(err))}
  }
}

export function addAndHandleReply (duckId, reply) {
  return async function (dispatch) {
    const {replyWithId, replyPromise} = postReply(duckId, reply)
    dispatch(addReply(duckId, replyWithId))
    try {
      await replyPromise
    }
    catch (err) {
      dispatch(removeReply(duckId, replyWithId.replyId))
      dispatch(addReplyError(err))
    }
  }
}

function duckReplies (state = initialReplyState, action) {
  switch (action.type) {

    case ADD_REPLY :
      return {
        ...state,
        [action.reply.replyId]: action.reply
      }

    case REMOVE_REPLY :
      return {
        ...state,
        [action.reply.replyId]: undefined,
      }

    default :
      return state
  }
}

function repliesAndLastUpdated (state = initialDuckState, action) {
  switch(action.type) {
    case FETCHING_REPLIES_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies,
      }

    case ADD_REPLY :
    case REMOVE_REPLY :
      return {
        ...state,
        replies: duckReplies(state.replies, action)
      }

    default :
      return state

  }
}

export default function replies (state = initialState, action){
  switch (action.type) {

    case FETCHING_REPLIES :
      return {
        ...state,
        isFetching: true,
      }

    case ADD_REPLY :
    case FETCHING_REPLIES_SUCCESS :
    case REMOVE_REPLY :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.duckId]: repliesAndLastUpdated(state[action.duckId], action)
      }

    case ADD_REPLY_ERROR :
    case FETCHING_REPLIES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    default :
      return state

  }
}
