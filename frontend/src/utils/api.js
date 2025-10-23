import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ yahan base URL set karo
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
