export default function JobCoverLetterReducer(state={job_cover_letter: {}}, action){
  switch(action.type) {
    case 'FETCH_JOB_COVER_LETTER':
      return { job_cover_letter: action.data };
    default:
      return state;
  }
}
