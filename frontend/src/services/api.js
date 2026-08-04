// ==========================================================
// API SERVICE
// ==========================================================
import axios from "axios";
const BASE_URL = "http://localhost:5000/api";

// Log a user in - sends credentials to the backend and stores
// the returned JWT so future requests can be authenticated.
export async function loginUser(credentials) {
  const response = await axios.post(`${BASE_URL}/auth/login`, credentials);

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}

// Register a new user.
export async function signupUser(userData) {
  const response = await axios.post(`${BASE_URL}/auth/signup`, userData);

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
}

// Send poster details to the AI generation endpoint.
export async function generatePoster(posterData) {
  try {
    const response = await axios.post(`${BASE_URL}/posters/generate`, {
      prompt: posterData.description,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}