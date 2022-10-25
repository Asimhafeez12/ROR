import HomeIllustration from './../../api/home_illustrations';

export function fetchHomeIllustration() {
  return function(dispatch) {
    return HomeIllustration.fetch().then(response => {
      dispatch(sendHomeIllustrationStatus(response.data));
    })

  }
}

function sendHomeIllustrationStatus(data) {
  if( "errors" in data )  {
    return { type: "ERROR_HOME_ILLUSTRATION", data };
  } else {
    return { type: "FETCH_HOME_ILLUSTRATION", home_illustrations: data };
  }
}
