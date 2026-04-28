import axios from "axios";
import { API_BASE_URL } from "./api";

const API = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default API;
