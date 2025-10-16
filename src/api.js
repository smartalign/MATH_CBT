// src/api.js

// Define your backend URLs
const LOCAL_API = "http://localhost:3001"; // your Express backend (running locally)
const DEPLOYED_API = "https://math-cbt-backend.vercel.app"; // your live backend

// Automatically choose the correct API based on environment
export const API_URL =
  process.env.NODE_ENV === "development" ? LOCAL_API : DEPLOYED_API;
