export default function HomeCategoryReducer(state={home_categories: []}, action) {
  switch(action.type) {
    case "FETCH_HOME_CATEGORY":
      return action;
    default:
      return state
  }
}
