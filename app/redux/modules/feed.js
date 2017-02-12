import {addListener} from 'redux/modules/listeners'
import { listenToFeed } from 'helpers/api'
import { addMultipleDucks } from 'redux/modules/ducks'
import { fromJS, List } from 'immutable'

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

function settingFeedListener() {
  return {
    type: SETTING_FEED_LISTENER,
  }
}

function settingFeedListenerError() {
  return {
    type: SETTING_FEED_LISTENER_ERROR,
    error: 'Error fetching feed',
  }
}

function settingFeedListenerSuccess(duckIds) {
  return {
    type: SETTING_FEED_LISTENER_SUCCESS,
    duckIds,
  }
}

function addNewDuckIdToFeed(duckId) {
  return {
    type: ADD_NEW_DUCK_ID_TO_FEED,
    duckId,
  }
}

export function resetNewDucksAvailable () {
  return {
    type: RESET_NEW_DUCKS_AVAILABLE,
  }
}

export function setAndHandleFeedListener() {
  let initialFetch = true
  return function (dispatch, getState) {
    if (getState().listeners.feed === true) {
      return
    }
    dispatch(addListener('feed'))
    dispatch(settingFeedListener())

    listenToFeed(({feed, sortedIds}) => {
      dispatch(addMultipleDucks(feed))
      initialFetch === true
      ? dispatch(settingFeedListenerSuccess(sortedIds))
      : dispatch(addNewDuckIdToFeed(sortedIds[0]))
    }, (error) => dispatch(settingFeedListenerError(error)))
  }
}

const initialState = fromJS({
  isFetching: false,
  newDucksAvailable: false,
  ducksIdsToAdd: [],
  duckIds: [],
  error: '',
})

export default function feed (state = initialState, action) {
  switch (action.type) {

    case SETTING_FEED_LISTENER :
      return state.merge({
        isFetching: true,
      })

    case SETTING_FEED_LISTENER_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })

    case SETTING_FEED_LISTENER_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        duckIds: action.duckIds,
        newDucksAvailable: false,
      })

    case ADD_NEW_DUCK_ID_TO_FEED :
      return state.merge({
        ducksIdsToAdd: state.get('ducksIdsToAdd').unshitf(action.duckId)
      })

    case RESET_NEW_DUCKS_AVAILABLE :
      return state.merge({
        duckIds: state.get('ducksIdsToAdd').concat(state.get('duckIds')),
        ducksIdsToAdd: [],
        newDucksAvailable: false,
      })

    default :
      return state

  }
}
