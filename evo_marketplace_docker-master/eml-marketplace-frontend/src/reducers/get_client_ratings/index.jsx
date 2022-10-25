export default function getClientRatingReducer(state={client_job_rating: {}}, action){
  switch(action.type) {
    case 'GET_CLIENT_RATING':
      return { client_job_rating: action.data };
    default:
      return state;
  }
}