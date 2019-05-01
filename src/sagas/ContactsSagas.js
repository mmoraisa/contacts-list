import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { CALL_FETCH_CONTACTS, fetchContactsSuccess, fetchContactsFailed, CALL_DELETE_CONTACT, deleteContactFailed, deleteContactSuccess } from '../ducks/Contacts';
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

function* deleteContact(action) {
  const { contactId } = action;
  try {
    yield call(ContactsAPI.deleteContact, contactId);
    yield put(deleteContactSuccess(contactId));
  }
  catch(error) {
    yield put(deleteContactFailed(contactId, error));
  }
}

function* deleteContactSagas() {
  yield takeEvery(CALL_DELETE_CONTACT, deleteContact);
}

export default function*() {
  yield all([
    fork(fetchContactsSagas),
    fork(deleteContactSagas)
  ]);
}
