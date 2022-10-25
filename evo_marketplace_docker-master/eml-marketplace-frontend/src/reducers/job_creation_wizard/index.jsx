export default function JobCreationWizardReducer(state={id: '', title: '', description: '', minimum_budget: 0, desired_profile: '', starting_date: '', availability: '', duration: '', additional_info: '', job_category_id: ''}, action){
	switch(action.type){

	case "SUBMIT_FORM":
		return {success: true, ...action.data.job}

	case "JOB_CREATE_WIZARD_FIELDS":
		return { success: false, ...action.data }
	default:
		return {success: false, ...state}

	}
}
