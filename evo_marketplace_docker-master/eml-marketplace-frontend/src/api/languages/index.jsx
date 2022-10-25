import API from './../index';

export default class Language {
  static fetch() {
    return API.get('/api/v1/languages.json').catch(
      error => { return error; }
    );
  }
}