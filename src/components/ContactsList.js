import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import ContactsListItem from './ContactsListItem';
import './ContactsList.css';

const ContactsList = ({ contacts, loading }) => {

  return (
    <List
      className="contacts-list"
      loading={loading}>
      {
        contacts.map(contact =>
          <ContactsListItem
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
  ).isRequired,
  loading: PropTypes.bool.isRequired
};

export default ContactsList;
