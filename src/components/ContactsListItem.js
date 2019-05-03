import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Icon, Spin } from 'antd';
import './ContactsListItem.css';

const { Meta } = Card;

const ContactsListItem = ({ avatar, deleteContact, editContact, loading, name, phone }) => (
  <Card
    className="contact"
    style={{ marginTop: 16 }}
    actions={[
      <Spin onClick={deleteContact} size="small" spinning={loading.delete}>
        <Icon type="delete"/>
      </Spin>,
      <Spin onClick={editContact} size="small" spinning={loading.edit}>
        <Icon type="edit" />
      </Spin>
    ]}
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
  deleteContact: PropTypes.func.isRequired,
  editContact: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  loading: PropTypes.shape({
    delete: PropTypes.bool.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default ContactsListItem;
