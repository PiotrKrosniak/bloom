import { AUTH_TOKEN } from "./constants";

export const getToken = () => {
  return localStorage.getItem("userToken");
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem("userToken", token);
  }
};

export const removeToken = () => {
  localStorage.removeItem("userToken");
};
