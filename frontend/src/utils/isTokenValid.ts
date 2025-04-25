import { jwtDecode } from "jwt-decode";

export default function isTokenValid() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    let current_date = new Date();

    // JWT exp is in seconds
    if (decoded?.exp && decoded.exp * 1000 < current_date.getTime()) {
      return false;
    } else {
      return true;
    }
  } catch (err) {
    return false;
  }
}
