import api from "../../api/axios";

export const createBarterRequest = (details) => api.post("/barter", details);
export const getIncomingBarterRequests = () => api.get("/barter/incoming");
export const getOutgoingBarterRequests = () => api.get("/barter/outgoing");
export const updateBarterRequest = (id, status) => api.put(`/barter/${id}`, { status });
export const completeBarterRequest = (id) => api.put(`/barter/${id}/complete`);
