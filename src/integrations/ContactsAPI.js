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

}

export default ContactsAPI;
