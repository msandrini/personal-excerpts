/* INNER SAGA */

import { call, put, takeLatest } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'

import ACTIONS from '...'

export function* fetchSample(): SagaIterator {
  const { data, error } = yield call(fetch, '/sample-api', { sample: 1 })

  // issue error
  if (error || !data || !data.sample) {
    yield put({ type: ACTIONS.ERRORED, error: (error || 'No data incoming') })
    return
  }

  // issue success
  yield put({ type: ACTIONS.SUCCEEDED, list: data.sample })
}

export default function* sampleWatch(): SagaIterator {
  yield takeLatest(ACTIONS.REQUESTED, fetchSample)
}


/** INDEX SAGA */


import { spawn } from 'redux-saga/effects'

export default function* rootSaga(): SagaIterator {
  yield spawn(sampleWatch)
  yield spawn(sampleWatch2)
  /* ... */
}

/* TESTS */

describe('Sample SAGA', () => {
  it('should the watchers watch', () => {
    const gen = sampleWatch()
    const watched = gen.next()
    expect(watched.value).toEqual(takeLatest(ACTIONS.REQUESTED, fetchSample))
    const final = gen.next()
    expect(final.done).toBeTruthy()
  })
  it('should yield initial actions', () => {
    const gen = fetchImages()
    const firstYield = gen.next({})
    const postYield = gen.next()
    expect(postYield.done).toEqual(true)
  })
})