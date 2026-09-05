import api from "../../api/axios";

export const loginRequest = (credentials) => api.post("/auth/login", credentials);

export const registerRequest = (userDetails) =>
  api.post("/auth/register", userDetails);

export const getMeRequest = () => api.get("/auth/me");
export const refreshSessionRequest = () => api.post("/auth/refresh");
export const logoutRequest = () => api.post("/auth/logout");
export const forgotPasswordRequest = (email) => api.post("/auth/forgot-password", { email });
export const resetPasswordRequest = (token, password) => api.post("/auth/reset-password", { token, password });
export const verifyEmailRequest = (token) => api.post("/auth/verify-email", { token });

export const updateProfileRequest = (profileDetails) =>
  profileDetails.avatarFile
    ? api.put("/users/profile", Object.entries(profileDetails).reduce((formData, [key, value]) => {
        if (key !== "avatarFile" && value !== undefined) formData.append(key, value);
        if (key === "avatarFile") formData.append("avatar", value);
        return formData;
      }, new FormData()))
    : api.put("/users/profile", profileDetails);
