import defaultAxios from "axios";

export const axios = defaultAxios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:4000/",
});
