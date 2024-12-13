import axios from "axios";
import CONFIG from "../CONFIG";

const api = axios.create({
  baseURL: CONFIG.apiBaseUrl
});

export default api;