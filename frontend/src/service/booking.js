import { API_URL } from "./api";

export const createRequest = async (data) => {
  try {
    const res = await fetch(`${API_URL}/booking`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ส่ง coookies ไปยัง backend -> req.cookies.token
    });
    return res.json();
  } catch (e) {
    console.error("Booking error:", e);
    throw new Error("Can not book this camp: " + e.message);
  }
};
