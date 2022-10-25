export default function ClientProfileWizardReducer(state={phone_number: window.currentUser, country: window.currentUser || ''}, action){
	switch(action.type){
	case "SUBMIT_FORM":
		return {success: true, ...action.data.user}

	case "UPDATE_WIZARD_FIELDS":
		return { success: false, ...action.data }
	default:
		return {success: false, ...state}

	}
}
