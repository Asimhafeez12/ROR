export default function UpdateJobReducer(state={title: '', description: '', minimum_budget: 0, desired_profile: '', starting_date: '', availability: '', duration: '', additional_info: ''}, action){
	switch(action.type){
	case "SUBMIT_FORM":
		return {success: true, ...action.data}

	case "UPDATE_JOB_FIELDS":
		return { success: false, ...action.data }
	default:
		return {success: false, ...state}

	}
}
