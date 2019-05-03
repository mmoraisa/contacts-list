import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { callFetchContacts, callCreateContact } from '../ducks/Contacts';
import ModalCreateContact from './modals/ModalCreateContact';
import ContactsList from './ContactsList';
import SearchBox from './SearchBox';
import './Main.css';

const Main = ({ contacts, createContact, fetchContacts }) => {

  const [query, setQuery] = useState(null);
  const [viewingContacts, setViewingContacts] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

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

  const handleContactCreate = contactInfo => {
    setIsCreating(false);
    createContact(contactInfo);
  }

  return (
    <Fragment>
      <ModalCreateContact
        onCancel={() => setIsCreating(false)}
        saveContact={handleContactCreate}
        visible={isCreating}
        />
      <div className="app">
        <div>
          <SearchBox
            onSearch={query => {
              setQuery(query);
            }} />
          <Button
            icon="user-add"
            loading={contacts.loading.create}
            onClick={() => setIsCreating(true)}>
            Create new
          </Button>
        </div>
        <ContactsList
          contacts={viewingContacts} />
      </div>
    </Fragment>
  );
};

export default connect(
  ({ contacts }) => ({ contacts }),
  dispatch => ({
    fetchContacts() {
      dispatch(callFetchContacts());
    },
    createContact(contact) {
      dispatch(callCreateContact(contact));
    }
  })
)(Main);
