import defaultAxios from "axios";

export const axios = defaultAxios.create({
  baseURL: process.env.BASE_URL,
});
