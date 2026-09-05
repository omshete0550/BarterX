import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../features/notifications/notificationSlice";
import { fetchConversations, fetchMessages, setOnlineUsers, setUserOffline, setUserOnline } from "../features/messages/messageSlice";

const socketUrl = import.meta.env.VITE_SOCKET_URL || (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

function RealtimeBridge({ children }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return undefined;
    const socket = io(socketUrl, { auth: { token } });
    socket.on("online_users", ({ users }) => dispatch(setOnlineUsers(users)));
    socket.on("user_online", ({ userId }) => dispatch(setUserOnline(userId)));
    socket.on("user_offline", ({ userId }) => dispatch(setUserOffline(userId)));
    socket.on("new_message", ({ message }) => {
      dispatch(fetchConversations());
      dispatch(fetchMessages(message.conversation));
    });
    socket.on("receive_message", ({ message }) => dispatch(fetchMessages(message.conversation)));
    socket.on("notification_received", () => dispatch(fetchNotifications()));
    return () => socket.disconnect();
  }, [dispatch, token]);

  return children;
}

export default RealtimeBridge;
