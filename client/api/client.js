import axios from "axios";

export const baseURL = import.meta.env.VITE_BASED_URL;

const client = axios.create({ baseURL, withCredentials: true });

export default client;
