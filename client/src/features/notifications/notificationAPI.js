import api from "../../api/axios";

export const getNotificationsRequest = () => api.get("/notifications");
export const markNotificationReadRequest = (id) => api.put(`/notifications/read/${id}`);
export const markAllNotificationsReadRequest = () => api.put("/notifications/read-all");
export const deleteNotificationRequest = (id) => api.delete(`/notifications/${id}`);
