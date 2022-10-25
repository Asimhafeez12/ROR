import freelancerEditAPI from '../../api/freelancer_profile';

export function freelancerEditFields(data){
	return function(dispatch){
		return dispatch(createFreelancerEditState(data));
	}
}

export function submitForm(data) {
	return function(dispatch){
		return freelancerEditAPI.save(data).then((response) =>
			dispatch(wizardResponse(response))
		)
	}	
}

function createFreelancerEditState(data){
	return { type: "FREELANCER_PROFILE_CHANGES", data }
}

function wizardResponse(data) {
	if ("errors" in data) {
		return { type: 'ERROR_WIZARD_FORM', data}
	} else {
		return { type: 'SUBMIT_FORM', data }
	}	
}
