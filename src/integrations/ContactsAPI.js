import { CONTACTS_API_ENDPOINT } from '../defaults/Endpoints';

class ContactsAPI {

  static fetchContacts() {
    return new Promise((resolve, reject) => {
      fetch(CONTACTS_API_ENDPOINT)
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    });
  }

  static deleteContact(contactId) {
    return new Promise((resolve, reject) => {
      fetch(`${CONTACTS_API_ENDPOINT}/${contactId}`, {
        method: 'delete'
      })
      .then(resolve)
      .catch(reject);
    });
  }

  static editContact(contact) {
    return new Promise((resolve, reject) => {
      fetch(`${CONTACTS_API_ENDPOINT}/${contact.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...contact,
          avatar: `https://picsum.photos/200/200?random=${contact.id}`
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(resolve)
      .catch(reject);
    })
  }

}

export default ContactsAPI;
