import Language from './../../api/languages';

export function fetch() {
  return function(dispatch) {
    return Language.fetch().then((res) => {
      return dispatch({type: 'FETCH_ALL_LANGUAGES_LIST', ...res});
    });
  };
}
