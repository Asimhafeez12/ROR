export default function lastJobReducer(state={job: {}}, action){
  switch(action.type) {
    case 'FETCH_LAST_JOB':
      return { job: action.data };
    default:
      return state;
  }
}
