import API from './../index';

class JobCategory {
  static fetch() {
    return API.get('/api/v1/job_categories.json').catch(
      error => { return error; }
    );
  }
}

export default JobCategory;
