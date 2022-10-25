import HomeCategory from './../../api/home_categories';

export function fetchHomeCategory() {
  return function(dispatch) {
    return HomeCategory.fetch().then(response => {
      dispatch(sendHomeCategoryStatus(response.data));
    })

  }
}

function sendHomeCategoryStatus(data) {
  if( "errors" in data )  {
    return { type: "ERROR_HOME_CATEGORY", data };
  } else {
    return { type: "FETCH_HOME_CATEGORY", home_categories: data };
  }
}
