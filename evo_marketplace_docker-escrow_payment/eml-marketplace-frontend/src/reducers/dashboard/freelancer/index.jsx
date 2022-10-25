export default function Freelancer(state={expected_timeline: '', expected_amount: '', cover_letter: '', user_id: '', job_id: ''}, action){
	switch(action.type){

	case "SUBMIT_FORM":
		return {success: true, ...action.data.job}
	default:
		return {success: false, ...state}

	}
}
