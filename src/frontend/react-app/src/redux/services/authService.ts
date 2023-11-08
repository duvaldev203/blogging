import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthControllerApi, SignInRequest, SignResponse } from '../../generated';

export default {
  login: async (email: string, password: string) => {
    try {
      const AuthApi = new AuthControllerApi();
      const apiParams:SignInRequest = {
        email: email,
        password: password
      }
      const response = await AuthApi.login(apiParams);

      console.log(response)

      if (response.status === 403) {
        throw new Error('Invalid username or password');
      }
      toast.success('Logged in successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });

      const data:SignResponse = await response.data;
      return data;
    } catch (error) {
      throw error;
    }
  },
};
