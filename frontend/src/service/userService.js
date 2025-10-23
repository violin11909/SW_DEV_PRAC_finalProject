import { API_URL } from "./api";
import Cookies from 'js-cookie'; 

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  if (!token) {
    return { "Content-Type": "application/json" };
  }
  return {
    "Content-Type":"application/json",
    Authorization: `Bearer ${token}`
  };
};

export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email, password}),
    });
    const data = await res.json();

    if (data.success) {
      Cookies.set('token', data.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });
    }

    return data;
  } catch (e) {
    console.error("Login error:", e);
    throw new Error("Can not login: " + e.message);
  }
};

export const getMe = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch profile");

    return await res.json();
  } catch (err) {
    console.error("GetMe failed: " , err);
    throw err;
  }
};