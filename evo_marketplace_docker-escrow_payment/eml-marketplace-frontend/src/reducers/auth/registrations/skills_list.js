const initialState = {
  skills_list: {}
}

export default registerFLRSkillsList(state=initialState, action) {
  switch(action.type) {
    case 'UPDATE_FLR_SKILLS_LIST':
      return { skills_list: action.data }
    default:
      return state;
  }
}
