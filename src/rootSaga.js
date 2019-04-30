import { all, fork } from 'redux-saga/effects';
import contactsSaga from './sagas/ContactsSagas';

export default function* rootSaga() {
  yield all([
    fork(contactsSaga)
  ]);
}
