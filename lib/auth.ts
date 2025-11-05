// Admin Authentication Management

export interface AdminUser {
  email: string;
  password: string;
  name: string;
}

// Default admin credentials (seeder)
const DEFAULT_ADMIN: AdminUser = {
  email: "admin@cbtrading.com",
  password: "CBTrading2024!", // Password default
  name: "CB Trading Admin",
};

// Storage keys
const ADMIN_CREDENTIALS_KEY = "cb_admin_credentials";
const ADMIN_SESSION_KEY = "cb_admin_session";

// Initialize admin credentials (first time setup)
export const initializeAdmin = () => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
  if (!stored) {
    // Set default admin on first load
    localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(DEFAULT_ADMIN));
  }
};

// Get current admin credentials
export const getAdminCredentials = (): AdminUser => {
  if (typeof window === "undefined") {
    return DEFAULT_ADMIN;
  }

  const stored = localStorage.getItem(ADMIN_CREDENTIALS_KEY);
  if (!stored) {
    initializeAdmin();
    return DEFAULT_ADMIN;
  }

  return JSON.parse(stored);
};

// Update admin credentials
export const updateAdminCredentials = (
  email: string,
  password: string,
  name?: string
): boolean => {
  if (typeof window === "undefined") return false;

  const currentAdmin = getAdminCredentials();
  const updatedAdmin: AdminUser = {
    email: email,
    password: password,
    name: name || currentAdmin.name,
  };

  localStorage.setItem(ADMIN_CREDENTIALS_KEY, JSON.stringify(updatedAdmin));
  return true;
};

// Verify login credentials
export const verifyLogin = (email: string, password: string): boolean => {
  const admin = getAdminCredentials();
  return admin.email === email && admin.password === password;
};

// Create admin session
export const createSession = () => {
  if (typeof window === "undefined") return;

  const session = {
    loggedIn: true,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

// Check if admin is logged in
export const isAdminLoggedIn = (): boolean => {
  if (typeof window === "undefined") return false;

  const session = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!session) return false;

  const sessionData = JSON.parse(session);
  return sessionData.loggedIn === true;
};

// Logout admin
export const logout = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ADMIN_SESSION_KEY);
};

// Get admin info (without password)
export const getAdminInfo = () => {
  const admin = getAdminCredentials();
  return {
    email: admin.email,
    name: admin.name,
  };
};
