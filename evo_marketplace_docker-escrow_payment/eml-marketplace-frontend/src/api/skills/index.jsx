import API from './../index';

export default class Skill {
  static fetch() {
    return API.get('/api/v1/skills.json').catch(
      error => { return error; }
    );
  }
}