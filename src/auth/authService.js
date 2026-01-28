const AUTH_KEY = "x_auth_logged_in";
const USERNAME = "admin";
const PASSWORD_HASH = "admin123"; // simple on purpose (personal tool)

export const authService = {
  login(username, password) {
    if (username === USERNAME && password === PASSWORD_HASH) {
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === "true";
  },
};
