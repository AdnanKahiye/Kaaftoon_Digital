// lib/auth.service.ts
import api from "./api";

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
}

export const AuthService = {
  // LOGIN
  login(data: LoginRequest) {
    return api.post("/User/login", data);
  },

  // LOGOUT
  logout() {
    return api.post("/User/logout");
  },
};
