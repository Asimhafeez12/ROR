export default function JobCategoryReducer(state={job_categories: []}, action) {
  switch(action.type) {
    case "FETCH_JOB_CATEGORY":
      return action;
    default:
      return state
  }
}
