import wizardApi from '../../api/client_wizard';

export function updateWizardFields(data){
	return function(dispatch){
		return dispatch(updateWizardState(data));
	}
}

export function submitForm(data) {
	return function(dispatch){
		return wizardApi.save(data).then((response) =>
			dispatch(wizardResponse(response))
		)
		
	}	

}

function updateWizardState(data){
	return { type: 'UPDATE_WIZARD_FIELDS', data }
}

function wizardResponse(data) {
	if ("errors" in data) {
		return { type: 'ERROR_WIZARD_FORM', data}
	} else {
		return { type: 'SUBMIT_FORM', data }
	}	
}