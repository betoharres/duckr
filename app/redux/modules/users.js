import auth, {logout, saveUser} from 'helpers/auth'
import { fetchUser, fetchUsersDucks } from 'helpers/api'
import {formatUserInfo} from 'helpers/utils'

const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER = 'FETCHING_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const AUTH_USER = 'AUTH_USER'

export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure () {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user',
  }
}

export function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default :
      return state
  }
}

// Users
const initialState = {
  isFetching: false,
  error: '',
  isAuthed: false,
  authedId: '',
}

export default function users (state = initialState, action) {
  switch (action.type) {

    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }

    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }

    case FETCHING_USER :
      return {
        ...state,
        isFetching: true,
      }

    case FETCHING_USER_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }

    case FETCHING_USER_SUCCESS :
      return action.user === null
        ? {
          ...state,
          isFetching: false,
          error: '',
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(
            state[action.uid],
            action
          ),
        }
    default :
      return state
  }
}

// Thunks

export function fetchAndHandleUser (uid) {
  return async function (dispatch) {
    dispatch(fetchingUser())
    try {
      const user = await fetchUser(uid)
      dispatch(fetchingUserSuccess(uid, user, Date.now()))
    } catch (err) {dispatch(fetchingUserFailure(err))}
  }
}

export function fetchAndHandleAuthedUser () {
  return async function (dispatch) {
    dispatch(fetchingUser())
    try {
      const {uid, facebook} = await auth()
      const userInfo = formatUserInfo(facebook.displayName,
                                      facebook.profileImageURL,
                                      uid)
      dispatch(fetchingUserSuccess(uid, userInfo, Date.now()))
      await saveUser(userInfo)
      dispatch(authUser(uid))
      return facebook
    } catch (err) {
      dispatch(fetchingUserFailure(err))
      console.warn('error in fetchAndHandleAuthedUser', err)
    }
  }
}

export function logoutAndUnauth() {
  return function (dispatch) {
    logout()
    dispatch(unauthUser())
  }
}
