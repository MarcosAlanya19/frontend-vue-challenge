import axios from "axios";

const { public: { apiBaseUrl } } = useRuntimeConfig();

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
