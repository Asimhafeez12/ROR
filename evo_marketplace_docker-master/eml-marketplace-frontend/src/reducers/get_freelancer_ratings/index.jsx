export default function getFreelancerRatingReducer(state={freelancer_job_rating: {}}, action){
  switch(action.type) {
    case 'GET_FREELANCER_RATING':
      return { freelancer_job_rating: action.data };
    default:
      return state;
  }
}