import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { callFetchContacts } from '../ducks/Contacts';
import ContactsList from './ContactsList';

const Main = ({ contacts, fetchContacts }) => {

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <ContactsList
      contacts={contacts.data}
      loading={contacts.loading.fetch} />
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
