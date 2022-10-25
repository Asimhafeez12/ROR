import JobCoverLetter from '../../../api/dashboard/job_cover_letters';

export function create_job_letter(data) {
	return function(dispatch){
		return JobCoverLetter.post(data).then((response) =>
			dispatch(wizardResponse(response))
		)
		
	}	

}

function wizardResponse(data) {
	if ("errors" in data) {
		return { type: 'ERROR_IN_FORM', data}
	} else {
		return { type: 'SUBMIT_FORM', data }
	}	
}
