import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Icon, Spin } from 'antd';
import './ContactsListItem.css';

const { Meta } = Card;

const ContactsListItem = ({ avatar, deleteContact, id, loading, name, phone }) => (
  <Card
    className="contact"
    style={{ marginTop: 16 }}
    actions={[
      <Spin spinning={loading.delete} size="small">
        <Icon onClick={deleteContact} type="delete"/>
      </Spin>,
      <Icon type="edit" />,
      <Icon type="ellipsis" />]}
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
  id: PropTypes.string.isRequired,
  loading: PropTypes.shape({
    delete: PropTypes.bool.isRequired
  }).isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired
};

export default ContactsListItem;
