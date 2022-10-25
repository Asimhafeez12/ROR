import API from './../../index';

export default class InvitedFreelancer {
  static fetch(id){
    return API.get(`/api/v1/jobs/${id}/invited_freelancers.json`).catch(
      error => { return error; }
    );
  }
}
