/* Action Types */
export const CALL_FETCH_CONTACTS = 'CALL_FETCH_CONTACTS';
export const FETCH_CONTACTS_FAILED = 'FETCH_CONTACTS_FAILED';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';

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

/* Initial State */
const INITIAL_STATE = {
  data: [],
  error: {
    fetch: null
  },
  loading: {
    fetch: false
  }
};

/* Reducer */
export default function reducer(state = INITIAL_STATE, action) {

  const { contacts, error, type } = action;

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
    default:
      return state;
  }

}
