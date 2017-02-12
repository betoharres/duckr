import { saveToUsersLikes,
         deleteFromUsersLikes,
         incrementNumberOfLikes,
         decrementNumberOfLikes,
         fetchUsersLikes
       } from 'helpers/api'

const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'
export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'

function fetchingLikes () {
  return {
    type: FETCHING_LIKES
  }
}

function fetchingLikesError () {
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes',
  }
}

function fetchingLikesSuccess (likes) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes,
  }
}


function addLike (duckId) {
  return {
    type: ADD_LIKE,
    duckId,
  }
}

function removeLike (duckId) {
  return {
    type: REMOVE_LIKE,
    duckId,
  }
}

export function addAndHandleLike (duckId, e) {
  e.stopPropagation()

  return async function (dispatch, getState) {

    dispatch(addLike(duckId))
    const uid = getState().users.authedId
    try {
      await Promise.all([
                        saveToUsersLikes(uid, duckId),
                        incrementNumberOfLikes(duckId)
                        ])
    } catch (err) {
      console.warn('Error in addAndHandleLike', err)
      dispatch(removeLike(duckId))
    }

  }
}

export function handleDeleteLike (duckId, e) {
  e.stopPropagation()

  return async function (dispatch, getState) {

    dispatch(removeLike(duckId))
    const uid = getState().users.authedId
    try {
      await Promise.all([
                        deleteFromUsersLikes(uid, duckId),
                        decrementNumberOfLikes(duckId)
                        ])
    } catch (err) {
      console.warn('Error in handleDeleteLike', err)
      dispatch(addLike(duckId))
    }

  }
}

export function setUsersLikes () {
  return async function (dispatch, getState) {

    const uid = getState().users.authedId

    dispatch(fetchingLikes())
    try {
      const likes = await fetchUsersLikes(uid)
      dispatch(fetchingLikesSuccess(likes))
    } catch (err) {
      console.warn('Error in fetchUsersLikes', err)
      dispatch(fetchingLikesError(err))
    }


  }
}

// Users Likes
const initialState = {
  isFetching: false,
  error: '',
}

export default function usersLikes (state = initialState, action){
  switch (action.type) {

    case FETCHING_LIKES :
      return {
        ...state,
        isFetching: true,
      }

    case FETCHING_LIKES_ERROR :
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: action.error
      }

    case FETCHING_LIKES_SUCCESS :
      return {
        ...state,
        ...action.likes,
        isFetching: false,
      }

    case ADD_LIKE :
      return {
        ...state,
        [action.duckId]: true
      }

    case REMOVE_LIKE :
      return Object.keys(state)
        .filter((duckId) => action.duckId !== duckId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})

    default :
      return state

  }
}
