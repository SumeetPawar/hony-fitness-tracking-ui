// lib/auth.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

type LoginResponse = {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
};

type SignupResponse = {
  id: string;
  email: string;
  name?: string;
};

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refresh_token");
}

export function setTokens(access: string, refresh?: string) {
  localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
}

export async function refreshAccessToken(): Promise<boolean> {
  const rt = getRefreshToken();
  if (!rt) return false;

  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: rt }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.access_token) return false;

  setTokens(data.access_token, data.refresh_token); // refresh_token optional
  return true;
}

export function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function isAuthed() {
  return !!getAccessToken();
}

// ✅ Real backend login
export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return { ok: false, error: (data?.detail || data?.message || "Login failed") as string };
  }

  const parsed = data as LoginResponse;
  if (!parsed.access_token) {
    return { ok: false, error: "Login response missing access_token" };
  }

  setTokens(parsed.access_token, parsed.refresh_token);
  return { ok: true };
}


export async function signup(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    return { ok: false, error: (data?.detail || data?.message || "Signup failed") as string };
  }

  return { ok: true, data: data as SignupResponse };
}