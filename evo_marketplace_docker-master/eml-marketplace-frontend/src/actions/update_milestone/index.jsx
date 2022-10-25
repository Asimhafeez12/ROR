import UpdateMilestone from '../../api/update_milestone';

export function submitForm(milestone_id, data) {
	return function(dispatch){
		return UpdateMilestone.update(milestone_id, data).then((response) =>
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
