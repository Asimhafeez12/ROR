import JobAdvisor from '../../api/job_advisors';

export function submitForm(data) {
	return function(dispatch){
		return JobAdvisor.post(data).then((response) =>
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
