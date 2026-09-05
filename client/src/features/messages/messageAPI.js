import api from "../../api/axios";

export const getConversationsRequest = () => api.get("/conversations");
export const createConversationRequest = (participantId) => api.post("/conversations", { participantId });
export const getMessagesRequest = (conversationId) => api.get(`/messages/${conversationId}`);
export const sendMessageRequest = ({ receiver, text, conversationId }) => api.post("/messages", { receiver, text, conversationId });
