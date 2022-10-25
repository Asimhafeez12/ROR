import jobWizardApi from '../../api/job_wizard';

export function createJobWizardFields(data){
	return function(dispatch){
		return dispatch(createJobWizardState(data));
	}
}

export function submitForm(data) {
	return function(dispatch){
		return jobWizardApi.save(data).then((response) =>
			dispatch(wizardResponse(response))
		)
		
	}	

}

function createJobWizardState(data){
	return { type: 'JOB_CREATE_WIZARD_FIELDS', data }
}

function wizardResponse(data) {
	if ("errors" in data) {
		return { type: 'ERROR_WIZARD_FORM', data}
	} else {
		return { type: 'SUBMIT_FORM', data }
	}	
}
