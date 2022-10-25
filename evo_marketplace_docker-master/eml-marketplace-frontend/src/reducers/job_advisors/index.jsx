export default function JobAdvisorResucer(state={full_name: '', email: '', phone_number: '', skype_id: '', available_date: '', available_time: ''}, action){
  switch(action.type){

	case "SUBMIT_FORM":
		return {success: true, ...action.data.job_advisor}
  default:
    return {success: false, ...state}

  }
}
