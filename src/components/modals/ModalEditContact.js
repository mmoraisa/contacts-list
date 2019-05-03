import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Form, Modal } from 'antd';

const FormItem = Form.Item;

const ModalEditContact = ({ contacts, contactId, form, onCancel, visible, saveContact }) => {

  const { getFieldDecorator, setFieldsValue, validateFields } = form;

  const handleFormSubmit = () => {
    validateFields((err, values) => {
      if(!err) {
        saveContact(values);
      }
    });
  }

  const contact = contacts
                    .find(contact => parseInt(contact.id) === contactId);

  useEffect(() => {
    if(contact) {
      setFieldsValue({
        name: contact.name,
        phone: contact.phone
      });
    }
  }, [contact, setFieldsValue]);

  return (
    <Modal
      title="Edit Contact"
      visible={visible}
      onOk={handleFormSubmit}
      onCancel={onCancel}
    >
      <Form>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the contact name!' }],
          })(
            <Input placeholder="Name" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input the contact phone!' }],
          })(
            <Input placeholder="phone" />
          )}
        </FormItem>
      </Form>
    </Modal>
  );

}

ModalEditContact.propTypes = {
  contactId: PropTypes.number,
  onCancel: PropTypes.func.isRequired,
  saveContact: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Form.create()(
  connect(
    ({ contacts }) => ({ contacts: contacts.data })
  )(ModalEditContact)
);
