import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL || 'http://www.omdbapi.com',
  params: {
    apikey: process.env.API_KEY || '3e217d18',
  }
});