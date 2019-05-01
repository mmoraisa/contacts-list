import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'antd';
import { callDeleteContact } from '../ducks/Contacts';
import ContactsListItem from './ContactsListItem';
import './ContactsList.css';

const ContactsList = ({ contacts, deleteContact, loading }) => {

  return (
    <List
      className="contacts-list"
      loading={loading.fetch}>
      {
        contacts.map(contact =>
          <ContactsListItem
            deleteContact={() => deleteContact(contact.id)}
            loading={{
              delete: loading.delete.includes(contact.id)
            }}
            key={contact.id}
            {...contact} />
        )
      }
    </List>
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
    }
  })
)(ContactsList);
