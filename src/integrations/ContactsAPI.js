class ContactsAPI {

  static fetchContacts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([1,2,3]);
      }, 2000);
    });
  }

}

export default ContactsAPI;
