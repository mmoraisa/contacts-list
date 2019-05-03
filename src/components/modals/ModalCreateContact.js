import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Modal } from 'antd';

const FormItem = Form.Item;

const ModalCreateContact = ({ form, onCancel, visible, saveContact }) => {

  const { getFieldDecorator, resetFields, validateFields } = form;

  const handleFormSubmit = () => {
    validateFields((err, values) => {
      if(!err) {
        saveContact(values);
        resetFields();
      }
    });
  }

  return (
    <Modal
      title="Create Contact"
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

ModalCreateContact.propTypes = {
  onCancel: PropTypes.func.isRequired,
  saveContact: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Form.create()(ModalCreateContact);
