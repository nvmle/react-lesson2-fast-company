import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
  (config) => {
    if (configFile.isFirebase) {
      const containsSlash = /\/$/gi.test(config.url);
      config.url =
        (containsSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

axios.interceptors.response.use(
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
