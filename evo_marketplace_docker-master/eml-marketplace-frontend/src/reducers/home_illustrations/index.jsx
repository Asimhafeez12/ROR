export default function HomeIllustrationReducer(state={home_illustrations: []}, action) {
  switch(action.type) {
    case "FETCH_HOME_ILLUSTRATION":
      return action;
    default:
      return state
  }
}
