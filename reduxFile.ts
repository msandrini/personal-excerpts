/* INNER REDUCER */

import produce, { Draft } from 'immer'
import ACTIONS from '...'

const initialState: SampleState = {
  isLoading: false,
  error: null,
  sample: null
}

const sampleReducer = produce((draft: Draft<SampleState>, action) => {
  if (action.type === ACTIONS.REQUESTED) {
    draft.isLoading = true
    draft.error = null
  } else if (action.type === ACTIONS.ERRORED) {
    draft.isLoading = false
    draft.error = action.error
  } else if (action.type === ACTIONS.SUCCEEDED) {
    draft.isLoading = false
    draft.sample = action.returnedData
  }
}, initialState)

export default sampleReducer




/* INDEX REDUCER */

import {
  combineReducers,
  Reducer,
  CombinedState,
  AnyAction
} from 'redux'


type IndividualReducersState = {
  sample: sampleState,
  sample2: sample2State,
}

type CombinedReducersState = Reducer<CombinedState<IndividualReducersState>, AnyAction>

const reducers = {
  sample: sampleReducer,
  sample2: sample2Reducer,
  /* ... */
}

const combinedReducers: CombinedReducersState = combineReducers(reducers)

export default combinedReducers