import UpdateJob from '../../api/update_job';

export function updateJob(job_id, data){
	return function(dispatch){
		return dispatch(updateJobState(job_id, data));
	}
}

export function submitForm(job_id, data) {
	return function(dispatch){
		return UpdateJob.update(job_id, data).then((response) =>
			dispatch(wizardResponse(response))
		)
	}

}

function updateJobState(job_id, data){
	return { type: 'UPDATE_JOB_FIELDS', data }
}

function wizardResponse(response) {
  const { data } = response;
	if ("errors" in data) {
		return { type: 'ERROR_WIZARD_FORM', data}
	} else {
		return { type: 'SUBMIT_FORM', data }
	}
}
