/* Action Types */
export const CALL_FETCH_CONTACTS = 'CALL_FETCH_CONTACTS';
export const FETCH_CONTACTS_FAILED = 'FETCH_CONTACTS_FAILED';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const CALL_DELETE_CONTACT = 'CALL_DELETE_CONTACT';
export const DELETE_CONTACT_FAILED = 'DELETE_CONTACT_FAILED';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const CALL_EDIT_CONTACT = 'CALL_EDIT_CONTACT';
export const EDIT_CONTACT_FAILED = 'EDIT_CONTACT_FAILED';
export const EDIT_CONTACT_SUCCESS = 'EDIT_CONTACT_SUCCESS';
export const CALL_CREATE_CONTACT = 'CALL_CREATE_CONTACT';
export const CREATE_CONTACT_FAILED = 'CREATE_CONTACT_FAILED';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';

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

export function callEditContact(contact) {
  return { type: CALL_EDIT_CONTACT, contact };
}

export function editContactFailed(contactId, error) {
  return { type: EDIT_CONTACT_FAILED, contactId, error };
}

export function editContactSuccess(contact) {
  return { type: EDIT_CONTACT_SUCCESS, contact };
}

export function callCreateContact(contact) {
  return { type: CALL_CREATE_CONTACT, contact };
}

export function createContactFailed(error) {
  return { type: CREATE_CONTACT_FAILED, error };
}

export function createContactSuccess(contact) {
  return { type: CREATE_CONTACT_SUCCESS, contact };
}

/* Initial State */
const INITIAL_STATE = {
  data: [],
  error: {
    create: null,
    delete: [],
    edit: [],
    fetch: null
  },
  loading: {
    create: false,
    delete: [],
    edit: [],
    fetch: false
  }
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {

  const { contactId, contact, contacts, error, type } = action;

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
    case CALL_EDIT_CONTACT:
      return {
        ...state,
        error: {
          ...state.error,
          edit: state.error.edit
                  .filter(contactError => contactError.contactId !== contact.id)
        },
        loading: {
          ...state.loading,
          edit: state.loading.edit
                  .concat([contact.id.toString()])
        }
      };
    case EDIT_CONTACT_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          edit: state.error.edit
                  .concat([{ contactId, error }])
        },
        loading: {
          ...state.loading,
          edit: state.loading.edit
                    .filter(currentContactId => currentContactId !== contactId)
        }
      };
    case EDIT_CONTACT_SUCCESS:
      return {
        ...state,
        data: state.data
                .filter(currentContact => parseInt(currentContact.id) !== parseInt(contact.id))
                .concat([contact]),
        error: {
          ...state.error,
          edit: state.error.edit
                  .filter(contactError => contactError.contactId !== contact.id)
        },
        loading: {
          ...state.loading,
          edit: state.loading.edit
                    .filter(currentContactId => currentContactId !== contact.id)
        }
      };
    case CALL_CREATE_CONTACT:
      return {
        ...state,
        error: {
          ...state.error,
          create: null
        },
        loading: {
          ...state.loading,
          create: true
        }
      };
    case CREATE_CONTACT_FAILED:
      return {
        ...state,
        error: {
          ...state.error,
          create: error
        },
        loading: {
          ...state.loading,
          create: false
        }
      };
    case CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        data: state.data.concat([contact]),
        error: {
          ...state.error,
          create: null
        },
        loading: {
          ...state.loading,
          create: false
        }
      };
    default:
      return state;
  }

}
