import API from './../index';

class HomeIllustration {
  static fetch() {
    return API.get('/api/v1/home_illustrations.json').catch(
      error => { return error; }
    );
  }
}

export default HomeIllustration;
