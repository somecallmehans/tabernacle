import { jwtDecode } from "jwt-decode";

const auth = {
  setToken: (access, refresh) => {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  },
  getToken: () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return null;
    }
    return jwtDecode(token);
  },
  removeToken: () => {
    return localStorage.removeItem("access_token");
  },
};

export default auth;
