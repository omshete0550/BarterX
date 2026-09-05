import api from "../../api/axios";

export const createRatingRequest = (details) => api.post("/ratings", details);
