export default function JobBonusReducer(state={job_incentive: {}}, action){
  switch(action.type) {
    case 'ADD_JOB_BONUS':
      return { job_incentive: action.data };
    default:
      return state;
  }
}
