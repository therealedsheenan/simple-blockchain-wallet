import axios from "axios";

const BASE_API_URL = "http://localhost:8000/api/v1";

export default axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});
