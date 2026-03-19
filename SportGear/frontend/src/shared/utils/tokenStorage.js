const AUTH_STORAGE_KEY = "sportgear-auth";

export function storeAuth(token, user) {
  if (!token) {
    clearStoredAuth();
    return;
  }

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify({ token, user: user || null })
  );
}

export function loadStoredAuth() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return { token: "", user: null };
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      token: parsed.token || "",
      user: parsed.user || null
    };
  } catch {
    return { token: "", user: null };
  }
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
