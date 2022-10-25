import API from './../index';

class ContactUs {
  static post(data) {
    return API.post('/api/v1/contact_us.json', data);
  }
}

export default ContactUs
