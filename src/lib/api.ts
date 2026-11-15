const defaultApiUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL?.trim() || defaultApiUrl
).replace(/\/+$/, "");
