export default function jobCategoryViewReducer(state={job_category: {}}, action){
  switch(action.type) {
    case 'FETCH_VIEW_JOB_CATEGORY':
      return { job_category: action.data };
    default:
      return state;
  }
}