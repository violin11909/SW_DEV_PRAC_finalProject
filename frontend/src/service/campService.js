import { API_URL } from "./api";

export const getCampgrounds = async () => {
  try {
    const res = await fetch(`${API_URL}/campgrounds`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (e) {
    console.error("Error to get all campgrounds data:", e);
    throw new Error("Can not to get all campgrounds data: " + e.message);
  }
};
