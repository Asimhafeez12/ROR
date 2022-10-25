import API from './../index';

class UpdateMilestone  {
  static update(milestone_id, data) {
    return API.put(`/api/v1/edit_milestones/${milestone_id}.json`, data).catch( error => {
        return error;
      });
  }
}

export default UpdateMilestone;