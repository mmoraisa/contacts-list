import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import { CALL_FETCH_CONTACTS, fetchContactsSuccess, fetchContactsFailed } from '../ducks/Contacts';
import ContactsAPI from '../integrations/ContactsAPI';

function* fetchContacts() {
  try {
    const contacts = yield call(ContactsAPI.fetchContacts);
    yield put(fetchContactsSuccess(contacts));
  }
  catch(error) {
    yield put(fetchContactsFailed(error));
  }
}

function* fetchContactsSagas() {
  yield takeLatest(CALL_FETCH_CONTACTS, fetchContacts);
}

export default function*() {
  yield all([
    fork(fetchContactsSagas)
  ]);
}
