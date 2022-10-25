export default function jobViewReducer(state={job: {}}, action){
  switch(action.type) {
    case 'FETCH_VIEW_JOB':
      return { job: action.data };
    default:
      return state;
  }
}
