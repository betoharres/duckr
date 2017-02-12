import {saveDuck, fetchDuck} from 'helpers/api'

import { closeModal } from './modal'
import { addSingleUsersDuck } from './usersDucks'

import { Map, fromJS } from 'immutable'

const FETCHING_DUCK = 'FETCHING_DUCK'
const FETCHING_DUCK_ERROR = 'FETCHING_DUCK_ERROR'
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'
const ADD_DUCK = 'ADD_DUCK'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'

function fetchingDuck() {
  return {
    type: FETCHING_DUCK,
  }
}
function fetchingDuckError() {
  return {
    type: FETCHING_DUCK_ERROR,
    error: 'Error fetching duck',
  }
}

function fetchingDuckSuccess (duck) {
  return {
    type: FETCHING_DUCK_SUCCESS,
    duck,
  }
}

export function removeFetching() {
  return {
    type: REMOVE_FETCHING,
  }
}

function addDuck(duck) {
  return {
    type: ADD_DUCK,
    duck,
  }
}

export function addMultipleDucks(ducks) {
  return {
    type: ADD_MULTIPLE_DUCKS,
    ducks,
  }
}

export function fetchAndHandleDuck (duckId) {
  return async function (dispatch) {
    dispatch(fetchingDuck())
    try{
      const duck = await fetchDuck(duckId)
      dispatch(fetchingDuckSuccess(duck))
    } catch (err) {
      dispatch(fetchingDuckError(err))
    }
  }
}

export function duckFanOut(duck) {
 return async function (dispatch, getState) {
   try {
    const uid = getState().users.authedId
    const duckWithId = await saveDuck(duck)
    dispatch(addDuck(duckWithId)),
    dispatch(closeModal()),
    dispatch(addSingleUsersDuck(uid, duckWithId.duckId))
   }
   catch (err) {
     console.warn('Error in duckFanOut', err)
   }
 }
}

const initialState = Map({
  isFetching: true,
  error: '',
})

export default function ducks (state = initialState, action) {
  switch (action.type) {

    case FETCHING_DUCK :
      return state.merge({
        isFetching: true,
      })

    case FETCHING_DUCK_ERROR :
      return state.merge({
        isFetching: false,
        error: action.error,
      })

    case ADD_DUCK :
    case FETCHING_DUCK_SUCCESS :
      return state.merge({
        isFetching: false,
        error: '',
        [action.duck.duckId]: action.duck,
      })

    case ADD_MULTIPLE_DUCKS :
      return state.merge(action.ducks)

    case REMOVE_FETCHING :
      return state.merge({
        isFetching: false,
        error: '',
      })

    default :
      return state

  }
}
