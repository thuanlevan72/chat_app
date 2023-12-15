import { setItem } from "../helpers/localStorageControl";
import { ApiService } from "./ApiServices";

const AuthApi = {
  LoginUser: async (value) => {
    const response = await ApiService.post("User/login", value);
    if (response.data.body) {
      setItem("Token", response.data.body);
      setItem("ILogin", true);
      return true;
    }
    return false;
  },
};
export default AuthApi;
