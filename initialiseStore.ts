import {
  createStore,
  applyMiddleware,
  Store,
  AnyAction,
  CombinedState
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'

import reducers from '../reducers'
import sagas from '../sagas'
import { State } from '../sharedTypes/state'

/**
 * Initialise Redux store and Saga middleware (to be called only at the entry point)
 */
const initStore = (): Store<CombinedState<State>, AnyAction> => {
  const sagaMiddleware = createSagaMiddleware()
  const composedAddOns = composeWithDevTools(applyMiddleware(sagaMiddleware))
  const store = createStore(reducers, composedAddOns)
  sagaMiddleware.run(sagas)

  return store
}

export default initStore
