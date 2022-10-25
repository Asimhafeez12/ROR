import API from './../index';

class HomeCategory {
  static fetch() {
    return API.get('/api/v1/home_categories.json').catch(
      error => { return error; }
    );
  }
}

export default HomeCategory;
