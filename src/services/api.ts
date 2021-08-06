import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL,
  params: {
    apikey: process.env.API_KEY,
  }
});