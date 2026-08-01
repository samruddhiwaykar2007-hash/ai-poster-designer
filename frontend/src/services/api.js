// ==========================================================
// API SERVICE (placeholder)
// ==========================================================
// This file is where you would normally set up calls to your
// real backend (e.g. using fetch or axios). For now, these are
// simple placeholder functions so the frontend structure is ready
// to be connected to a backend later.

import axios from "axios";
const BASE_URL = "http://localhost:5000/api"; // TODO: replace with your real API URL

// Example: log a user in
export async function loginUser(credentials) {
  // Replace this with a real fetch() call to your backend, e.g.:
  // const res = await fetch(`${BASE_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(credentials),
  // });
  // return res.json();

  console.log("loginUser called with:", credentials);
  return { success: true };
}

// Example: register a new user
export async function signupUser(userData) {
  console.log("signupUser called with:", userData);
  return { success: true };
}

// Example: send poster details to an AI generation endpoint
export async function generatePoster(posterData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/posters/generate`,
      {
        prompt: posterData.description
      }
    );

    return response.data;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
