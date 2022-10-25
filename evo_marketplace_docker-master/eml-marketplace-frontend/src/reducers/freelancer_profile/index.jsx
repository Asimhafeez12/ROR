export default function FreelancerReducer(state={title: '', summary:''}, action) {
    switch(action.type) {
        case "SUBMIT_FORM":
		return {success: true, ...action.data}

        case "FREELANCER_PROFILE_CHANGES":
            return { success: false, ...action.data }
        default:
            return {success: false, ...state}

	}

}