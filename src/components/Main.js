import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { callFetchContacts } from '../ducks/Contacts';

const Main = ({ contacts, fetchContacts }) => {

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <div>
      {JSON.stringify(contacts)}
    </div>
  );
};

export default connect(
  ({ contacts }) => ({ contacts }),
  dispatch => ({
    fetchContacts() {
      dispatch(callFetchContacts());
    }
  })
)(Main);
