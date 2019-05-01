/* Action Types */
export const CALL_FETCH_CONTACTS = 'CALL_FETCH_CONTACTS';
export const FETCH_CONTACTS_FAILED = 'FETCH_CONTACTS_FAILED';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const CALL_DELETE_CONTACT = 'CALL_DELETE_CONTACT';
export const DELETE_CONTACT_FAILED = 'DELETE_CONTACT_FAILED';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';

/* Action Creators */
export function callFetchContacts() {
  return { type: CALL_FETCH_CONTACTS };
}

export function fetchContactsFailed(error) {
  return { type: FETCH_CONTACTS_FAILED, error };
}

export function fetchContactsSuccess(contacts) {
  return { type: FETCH_CONTACTS_SUCCESS, contacts };
}

export function callDeleteContact(contactId) {
  return { type: CALL_DELETE_CONTACT, contactId };
}

export function deleteContactFailed(contactId, error) {
  return { type: DELETE_CONTACT_FAILED, contactId, error };
}

export function deleteContactSuccess(contactId) {
  return { type: DELETE_CONTACT_SUCCESS, contactId };
}

/* Initial State */
const INITIAL_STATE = {
  data: [],
  error: {
    delete: [],
    fetch: null
  },
  loading: {
    delete: [],
    fetch: false
  }
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {

  const { contactId, contacts, error, type } = action;

  switch(type) {
    case CALL_FETCH_CONTACTS:
      return {
        ...state,
        error: {
          ...state.error,
          fetch: null
        },
        loading: {
          ...state.loading,
          fetch: true
        }
      };
    case FETCH_CONTACTS_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          fetch: error
        },
        loading: {
          ...state.loading,
          fetch: false
        }
      };
    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        data: contacts,
        error: {
          ...state.error,
          fetch: null
        },
        loading: {
          ...state.loading,
          fetch: false
        }
      };
    case CALL_DELETE_CONTACT:
      return {
        ...state,
        error: {
          ...state.error,
          delete: state.error.delete
                    .filter(contactError => contactError.contactId !== contactId)
        },
        loading: {
          ...state.loading,
          delete: state.loading.delete
                    .concat([contactId])
        }
      };
    case DELETE_CONTACT_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          delete: state.error.delete
                    .concat([{ contactId, error }])
        },
        loading: {
          ...state.loading,
          delete: state.loading.delete
                    .filter(currentContactId => currentContactId !== contactId)
        }
      };
    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        data: state.data.filter(contact => contact.id !== contactId),
        error: {
          ...state.error,
          delete: state.error.delete
                    .filter(contactError => contactError.contactId !== contactId)
        },
        loading: {
          ...state.loading,
          delete: state.loading.delete
                    .filter(currentContactId => currentContactId !== contactId)
        }
      };
    default:
      return state;
  }

}
