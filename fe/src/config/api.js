const trimTrailingSlash = (value) => value?.replace(/\/$/, "");

const rawApiUrl = import.meta.env.NEXT_PUBLIC_API_URL || import.meta.env.VITE_API_URL;
const rawSocketUrl = import.meta.env.NEXT_PUBLIC_SOCKET_URL || import.meta.env.VITE_SOCKET_URL;

export const API_BASE_URL = trimTrailingSlash(rawApiUrl) || "http://localhost:3000";
export const SOCKET_BASE_URL = trimTrailingSlash(rawSocketUrl) || API_BASE_URL;
