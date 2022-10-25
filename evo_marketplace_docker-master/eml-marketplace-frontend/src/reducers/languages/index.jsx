const initialState = {
  languages: [],
}

export default function LanguagesReducer(state=initialState, action) {
  switch(action.type) {
    case 'FETCH_ALL_LANGUAGES_LIST':
      return {languages: action.data}
    default:
      return state;
  }
}
