import axios from 'axios';
import Defender from '../helpers/defender';
let options = {
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/'
};

if (Defender.isAuthenticated()) {
  options['headers'] = {
    'Authorization': Defender.token()
  }
}
const axiosClient = axios.create(options);
axiosClient.interceptors.request.use((config) => {
  if (Defender.isAuthenticated()) {
      config.headers.Authorization = Defender.token();
  }
  return config;
}, function (error) {
  if (error.response.status === 401) {
    Defender.logout();
    window.location = '/';
  }
});


axiosClient.interceptors.response.use(null, function(config) {
  if (config.response.status === 401) {
    Defender.logout();
    window.location = '/';
    return Promise.reject(config);
  }
  return Promise.resolve(config);
});
export default axiosClient;

