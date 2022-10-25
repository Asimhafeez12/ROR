import UpdateJobCategory from './../../../api/update_job/update_job_category';

export function updateJobCategory(job_id, data) {
  return function(dispatch) {
    return UpdateJobCategory.update(job_id, data).then(response => {
    })
  }
}