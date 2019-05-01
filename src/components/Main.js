import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { callFetchContacts } from '../ducks/Contacts';
import ContactsList from './ContactsList';
import SearchBox from './SearchBox';
import './Main.css';

const Main = ({ contacts, fetchContacts }) => {

  const [query, setQuery] = useState(null);
  const [viewingContacts, setViewingContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    if(query && query.length) {
      setViewingContacts(
        contacts.data.filter(
          contact => contact.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
    else {
      setViewingContacts(contacts.data);
    }
  }, [contacts.data, query]);

  return (
    <div className="app">
      <SearchBox
        onSearch={query => {
          setQuery(query);
        }} />
      <ContactsList
        contacts={viewingContacts}
        loading={contacts.loading.fetch} />
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
