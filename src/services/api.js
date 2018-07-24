import axios from "axios";

const BASE_API_URL = "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});

const Api = (options = {}) => {
  return axiosInstance(options)
    .then(response => {
      // other successful response
      return response.json().then(json => {
        return { json, response };
      });
    })
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
    .then(response => ({ response }), error => ({ error }));
};

export default Api;
