export default function freelancerjobRatingReducer(state={freelancer_job_rating: {}}, action){
  switch(action.type) {
    case 'GET_FREELANCER_JOB_RATING':
      return { freelancer_job_rating: action.data };
    default:
      return state;
    case 'ADD_FREELANCER_JOB_RATING':
      return { freelancer_job_rating: action.data };
  }
}