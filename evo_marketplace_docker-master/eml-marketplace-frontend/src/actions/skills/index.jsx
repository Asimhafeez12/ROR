import Skill from './../../api/skills';

export function fetch() {
  return function(dispatch) {
    return Skill.fetch().then((res) => {
      return dispatch({type: 'FETCH_ALL_SKILLS_LIST', ...res});
    });
  };
}
