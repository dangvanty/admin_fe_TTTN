import axiosClient from './axiosClient';

class LoginApi {
  login = (params) => {
    const url = '/users/login';
    return axiosClient.post(url, params);
  };
  checkAdmin = () => {
    const url = '/users/getRoleUser';
    return axiosClient.get(url);
  };
}
const loginApi = new LoginApi();
export default loginApi;
