type EnvironmentT = "develop" | "production";

// Retrieve environment variable
const environment: EnvironmentT =
  (process.env.NEXT_PUBLIC_ENVIRONMENT as EnvironmentT) || "develop";

// Base URL based on environment
export const baseUrl: string =
  environment === "production" ? "https://randomuser.me" : "";

// API Endpoints
export const endpoints = {
  // Login
  login: `${baseUrl}/api/?results=1&nat=us`,
};
