import ContactUs from '../../api/contact_us';

export function submitForm(data) {
	return function(dispatch){
		return ContactUs.post(data).then((response) =>
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
