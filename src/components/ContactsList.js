import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'antd';
import { callDeleteContact, callEditContact } from '../ducks/Contacts';
import ModalEditContact from './modals/ModalEditContact';
import ContactsListItem from './ContactsListItem';
import './ContactsList.css';

const ContactsList = ({ contacts, deleteContact, editContact, loading }) => {

  const [editing, setEditing] = useState(null);

  const handleContactEdit = contactInfo => {
    const contactId = editing;
    setEditing(null);
    editContact({ id: contactId, ...contactInfo });
  };

  return (
    <Fragment>
      <ModalEditContact
        contactId={editing}
        onCancel={() => setEditing(null)}
        saveContact={handleContactEdit}
        visible={Boolean(editing)}
        />
      <List
        className="contacts-list"
        loading={loading.fetch}>
        {
          contacts.map(contact =>
            <ContactsListItem
              deleteContact={() => deleteContact(contact.id)}
              editContact={() => setEditing(parseInt(contact.id))}
              loading={{
                delete: loading.delete.includes(contact.id)
              }}
              key={contact.id}
              {...contact} />
          )
        }
      </List>
    </Fragment>
  );

};

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({

    })
  ).isRequired
};

export default connect(
  ({ contacts }) => ({ loading: contacts.loading }),
  dispatch => ({
    deleteContact(contactId) {
      dispatch(callDeleteContact(contactId));
    },
    editContact(contact) {
      dispatch(callEditContact(contact));
    }
  })
)(ContactsList);
