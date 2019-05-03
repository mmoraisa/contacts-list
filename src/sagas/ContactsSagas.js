import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { CALL_FETCH_CONTACTS, fetchContactsSuccess, fetchContactsFailed, CALL_DELETE_CONTACT, deleteContactFailed, deleteContactSuccess, CALL_EDIT_CONTACT, editContactFailed, editContactSuccess, CALL_CREATE_CONTACT, createContactFailed, createContactSuccess } from '../ducks/Contacts';
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

function* editContact(action) {
  const { contact } = action;
  try {
    const savedContact = yield call(ContactsAPI.editContact, contact);
    yield put(editContactSuccess(savedContact));
  }
  catch(error) {
    yield put(editContactFailed(contact.id, error));
  }
}

function* editContactSagas() {
  yield takeEvery(CALL_EDIT_CONTACT, editContact);
}

function* createContact(action) {
  const { contact } = action;
  try {
    const savedContact = yield call(ContactsAPI.createContact, contact);
    yield put(createContactSuccess(savedContact));
  }
  catch(error) {
    yield put(createContactFailed(error));
  }
}

function* createContactSagas() {
  yield takeLatest(CALL_CREATE_CONTACT, createContact);
}

export default function*() {
  yield all([
    fork(fetchContactsSagas),
    fork(deleteContactSagas),
    fork(editContactSagas),
    fork(createContactSagas),
  ]);
}
