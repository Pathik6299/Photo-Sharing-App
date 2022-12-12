import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://pathik6299.pythonanywhere.com/',
});

//Check Token Exist or not
if (localStorage.hasOwnProperty("token")) {
	instance.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem('token');
}

instance.interceptors.response.use(function (response) {
	if(response){
		
		if(response.data && response.data.token){
			// append your request headers with an authenticated token
			response.headers["Authorization"] = `Bearer ${response.data.token}`;
		}
	}
	if (localStorage.hasOwnProperty("token")) {
		const token = localStorage.getItem("token");
		// append your request headers with an authenticated token
		response.headers["Authorization"] = `Bearer ${token}`;
	}
    return response;
}, function (error) {
    if (typeof error.response != 'undefined' && error.response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default instance;
