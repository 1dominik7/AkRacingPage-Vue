import axios from "axios";

export const baseURL = "http://localhost:8800/api/";

const client = axios.create({ baseURL, withCredentials: true });

export default client;
