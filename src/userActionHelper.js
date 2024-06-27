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
  localStorage.removeItem("user");
};

export const getUser = () => {
  const data = localStorage.getItem("user");
  return JSON.parse(data);
};

export const setUser = (token) => {
  if (token) {
    localStorage.setItem("user", JSON.stringify(token));
  }
};