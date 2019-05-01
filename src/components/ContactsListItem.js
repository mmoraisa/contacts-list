import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Icon } from 'antd';
import './ContactsListItem.css';

const { Meta } = Card;

const ContactsListItem = ({ avatar, id, name, phone }) => (
  <Card
    className="contact"
    style={{ width: 300, marginTop: 16 }}
    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
  >
    <Meta
      avatar={<Avatar src={avatar} />}
      title={name}
      description={`Phone: ${phone}`}
    />
  </Card>
);

ContactsListItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default ContactsListItem;
