import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.kambista.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
