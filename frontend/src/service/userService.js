import { API_URL } from "./api";
import Cookies from 'js-cookie'; 

export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
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
