import { AUTH_TOKEN, API } from "./constants";

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

export const getUserRole = async (userId) => {
  try{
    const response = await fetch(`${API}/users/${userId}?populate=role`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + AUTH_TOKEN
        }
      });

      const data = await response.json();
      return data ? data.role?.id : 1;
  }
  catch(error) {
      console.error(error);
  }
   
}