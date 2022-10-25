import axios from 'axios';
import Defender from '../helpers/defender';
let options = {
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/'
};
if (Defender.isAuthenticated()) {
	options["headers"] = {
		'Authorization': Defender.token()
	}
}
export default axios.create(options);
