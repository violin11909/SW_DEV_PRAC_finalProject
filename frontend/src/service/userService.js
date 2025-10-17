import { API_URL } from "./api";

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

    return await res.json();
  } catch (e) {
    console.error("Login error:", e);
    throw new Error("Can not login: " + e.message);
  }
};
