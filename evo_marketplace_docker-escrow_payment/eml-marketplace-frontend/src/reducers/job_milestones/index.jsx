const initial_state = {
  job_milestones: []
}

export default function JobMilestoneReducer(state=initial_state, action) {
  switch(action.type) {
    case 'UPDATE_CURRENT_PROJECT_MILESTONE':
      return {
        ...state,
        job_milestones: state.job_milestones.map((milestone) => (
          milestone.id === action.data.id ? action.data : milestone
        ))
      }
    case 'ADD_ALL_PROJECT_MILESTONE':
      return {
        ...state,
        job_milestones: state.job_milestones.concat(action.data)
      };

    case 'REMOVE_PROJECT_MILESTONE':
      return {job_milestones: action.data};

    case 'FETCH_ALL_PROJECT_MILESTONES':
      return {job_milestones: action.data};
    default:
      return state;
  }
}

