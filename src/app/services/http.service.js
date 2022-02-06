import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const http = axios.create({
  baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFirebase) {
      const containsSlash = /\/$/gi.test(config.url);
      config.url =
        (containsSlash ? config.url.slice(0, -1) : config.url) + ".json";

      const refreshToken = localStorageService.getRefreshToken();
      const expiresData = localStorageService.getTokenExpiresData();
      if (refreshToken && expiresData < Date.now()) {
        const { data } = await httpAuth.post("token", {
          grant_type: "refresh_token",
          refresh_token: refreshToken
        });
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          localId: data.user_id,
          expiresIn: data.expires_in
        });
      }

      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken };
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({ ...data[key] }))
    : data;
}

http.interceptors.response.use(
  (res) => {
    if (configFile.isFirebase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  function (error) {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      console.log(error);
      toast.error("error");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default httpService;