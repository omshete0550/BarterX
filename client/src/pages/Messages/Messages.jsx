import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  Image,
  Info,
  MapPin,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  X,
} from "lucide-react";

import Navbar from "../../component/layout/Navbar";
import Footer from "../../component/layout/Footer";

import { createConversation, fetchConversations, fetchMessages, sendMessage as sendChatMessage } from "../../features/messages/messageSlice";

import "./Messages.css";

function Messages() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);
  const { conversations: rawConversations, messagesByConversation, onlineUserIds, loading, sending, error } = useSelector((state) => state.messages);
  const currentUserId = currentUser?._id || currentUser?.id;
  const [activeId, setActiveId] = useState(null);

  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");

  const [showInfo, setShowInfo] = useState(false);

  const [mobileChat, setMobileChat] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => { dispatch(fetchConversations()); }, [dispatch]);

  useEffect(() => {
    const participantId = location.state?.participantId;
    if (!participantId || location.state?.conversationId) return;
    dispatch(createConversation(participantId)).then((result) => {
      if (createConversation.fulfilled.match(result)) setActiveId(result.payload._id);
    });
  }, [dispatch, location.state?.conversationId, location.state?.participantId]);

  const selectedId = activeId || location.state?.conversationId || rawConversations[0]?._id;

  useEffect(() => {
    if (selectedId) dispatch(fetchMessages(selectedId));
  }, [dispatch, selectedId]);

  const conversations = useMemo(() => rawConversations.map((conversation) => {
    const user = conversation.participants.find((participant) => (participant._id || participant) !== currentUserId) || {};
    const messages = (messagesByConversation[conversation._id] || []).map((item) => ({
      id: item._id,
      sender: (item.sender?._id || item.sender) === currentUserId ? "me" : "theirs",
      text: item.text,
      time: new Date(item.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    }));
    const lastMessage = conversation.lastMessage?.text || messages.at(-1)?.text || "No messages yet";
    return {
      id: conversation._id,
      user: { ...user, avatar: user.avatar || "https://placehold.co/80x80/f0ebff/6d3df5?text=BX", online: onlineUserIds.includes(user._id) },
      messages,
      lastMessage,
      lastMessageTime: conversation.lastMessage?.createdAt ? new Date(conversation.lastMessage.createdAt).toLocaleDateString() : "",
      unread: 0,
      product: { image: conversation.barterRequest?.requestedProduct?.images?.[0] || "https://placehold.co/120x90/f0ebff/6d3df5?text=BarterX", title: conversation.barterRequest?.requestedProduct?.title || "General conversation" },
      offeredProduct: { image: conversation.barterRequest?.offeredProduct?.images?.[0] || "https://placehold.co/120x90/f0ebff/6d3df5?text=BarterX", title: conversation.barterRequest?.offeredProduct?.title || "No linked offer" },
      status: conversation.barterRequest?.status || "Open",
    };
  }), [currentUserId, messagesByConversation, onlineUserIds, rawConversations]);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === selectedId,
  );

  /*
   * Scroll to latest message
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeConversation?.messages.length]);

  /*
   * Search conversations
   */
  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.name.toLowerCase().includes(search.toLowerCase()),
  );

  /*
   * Open conversation
   */
  const openConversation = (id) => {
    setActiveId(id);
    setMobileChat(true);

  };

  /*
   * Send message
   */
  const sendMessage = async (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || !activeConversation) {
      return;
    }

    const result = await dispatch(sendChatMessage({ receiver: activeConversation.user._id, text: trimmedMessage, conversationId: selectedId }));
    if (sendChatMessage.fulfilled.match(result)) setMessage("");
  };

  /*
   * No active conversation
   */
  if (loading && !activeConversation) {
    return <div className="messages-page"><Navbar /><main className="messages-main"><p>Loading conversations...</p></main><Footer /></div>;
  }

  if (!activeConversation) {
    return <div className="messages-page"><Navbar /><main className="messages-main"><p>{error || "No conversations yet."}</p></main><Footer /></div>;
  }

  return (
    <div className="messages-page">
      <Navbar />

      <main className="messages-main">
        <div className="messages-container">
          {/* ================================= */}
          {/* Page Header */}
          {/* ================================= */}

          <div className="messages-heading">
            <div>
              <span>COMMUNICATION</span>

              <h1>Messages</h1>
            </div>

            <p>Chat with people about your swaps.</p>
          </div>

          {/* ================================= */}
          {/* Messages Application */}
          {/* ================================= */}

          <div
            className={`messages-app ${mobileChat ? "mobile-chat-open" : ""}`}
          >
            {/* ================================= */}
            {/* Conversation Sidebar */}
            {/* ================================= */}

            <aside className="conversation-sidebar">
              <div className="conversation-header">
                <div>
                  <h2>Conversations</h2>

                  <span>{conversations.length} active chats</span>
                </div>
              </div>

              {/* Search */}

              <div className="conversation-search">
                <Search size={15} />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search conversations..."
                />

                {search && (
                  <button type="button" onClick={() => setSearch("")}>
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Conversation List */}

              <div className="conversation-list">
                {filteredConversations.length === 0 ? (
                  <div className="messages-empty-small">
                    <Search size={25} />

                    <strong>No conversations</strong>

                    <span>Try another search.</span>
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      type="button"
                      className={`conversation-item ${
                        conversation.id === selectedId ? "active" : ""
                      }`}
                      onClick={() => openConversation(conversation.id)}
                    >
                      <div className="conversation-avatar">
                        <img
                          src={conversation.user.avatar}
                          alt={conversation.user.name}
                        />

                        {conversation.user.online && (
                          <span className="online-dot" />
                        )}
                      </div>

                      <div className="conversation-info">
                        <div className="conversation-top">
                          <strong>{conversation.user.name}</strong>

                          <time>{conversation.lastMessageTime}</time>
                        </div>

                        <div className="conversation-bottom">
                          <span>{conversation.lastMessage}</span>

                          {conversation.unread > 0 && (
                            <b>{conversation.unread}</b>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </aside>

            {/* ================================= */}
            {/* Chat */}
            {/* ================================= */}

            <section className="chat-panel">
              {/* Chat Header */}

              <header className="chat-header">
                <button
                  type="button"
                  className="mobile-back"
                  onClick={() => setMobileChat(false)}
                >
                  <ArrowLeft size={19} />
                </button>

                <div className="chat-user">
                  <div className="chat-avatar">
                    <img
                      src={activeConversation.user.avatar}
                      alt={activeConversation.user.name}
                    />

                    {activeConversation.user.online && <span />}
                  </div>

                  <div>
                    <h2>{activeConversation.user.name}</h2>

                    <span>
                      {activeConversation.user.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>

                <div className="chat-header-actions">
                  <button type="button" title="Call">
                    <Phone size={17} />
                  </button>

                  <button
                    type="button"
                    title="Information"
                    onClick={() => setShowInfo(!showInfo)}
                  >
                    <Info size={18} />
                  </button>

                  <button type="button" title="More">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </header>

              {/* ================================= */}
              {/* Swap Context */}
              {/* ================================= */}

              <div className="swap-context">
                <div className="swap-context-product">
                  <img
                    src={activeConversation.product.image}
                    alt={activeConversation.product.title}
                  />

                  <div>
                    <span>SWAP REQUEST</span>

                    <strong>{activeConversation.product.title}</strong>
                  </div>
                </div>

                <div className="swap-context-arrow">⇄</div>

                <div className="swap-context-product">
                  <img
                    src={activeConversation.offeredProduct.image}
                    alt={activeConversation.offeredProduct.title}
                  />

                  <div>
                    <span>YOUR OFFER</span>

                    <strong>{activeConversation.offeredProduct.title}</strong>
                  </div>
                </div>

                <span
                  className={`swap-status ${activeConversation.status.toLowerCase()}`}
                >
                  {activeConversation.status}
                </span>
              </div>

              {/* ================================= */}
              {/* Messages */}
              {/* ================================= */}

              <div className="chat-messages">
                <div className="date-divider">
                  <span>TODAY</span>
                </div>

                {activeConversation.messages.map((item) => (
                  <div
                    key={item.id}
                    className={`message-row ${
                      item.sender === "me" ? "mine" : "theirs"
                    }`}
                  >
                    {item.sender === "theirs" && (
                      <img
                        className="message-avatar"
                        src={activeConversation.user.avatar}
                        alt=""
                      />
                    )}

                    <div className="message-content">
                      <div className="message-bubble">{item.text}</div>

                      <div className="message-meta">
                        <time>{item.time}</time>

                        {item.sender === "me" && <CheckCheck size={13} />}
                      </div>
                    </div>
                  </div>
                ))}

                <div ref={messagesEndRef} />
              </div>

              {/* ================================= */}
              {/* Message Input */}
              {/* ================================= */}

              <form className="message-composer" onSubmit={sendMessage}>
                <div className="composer-actions">
                  <button type="button" title="Attach file">
                    <Paperclip size={17} />
                  </button>

                  <button type="button" title="Add image">
                    <Image size={17} />
                  </button>
                </div>

                <input
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write a message..."
                />

                <button type="button" className="emoji-button" title="Emoji">
                  <Smile size={18} />
                </button>

                <button
                  type="submit"
                  className="send-button"
                  disabled={!message.trim()}
                >
                  {sending ? "Sending" : <Send size={16} />}
                </button>
              </form>
            </section>

            {/* ================================= */}
            {/* Info Panel */}
            {/* ================================= */}

            {showInfo && (
              <aside className="chat-info-panel">
                <div className="chat-info-header">
                  <strong>Swap Details</strong>

                  <button type="button" onClick={() => setShowInfo(false)}>
                    <X size={17} />
                  </button>
                </div>

                <div className="chat-info-user">
                  <img
                    src={activeConversation.user.avatar}
                    alt={activeConversation.user.name}
                  />

                  <strong>{activeConversation.user.name}</strong>

                  <span>BarterX member</span>
                </div>

                <div className="info-divider" />

                <div className="info-item">
                  <span>Product</span>

                  <strong>{activeConversation.product.title}</strong>
                </div>

                <div className="info-item">
                  <span>Your offer</span>

                  <strong>{activeConversation.offeredProduct.title}</strong>
                </div>

                <div className="info-item">
                  <span>Status</span>

                  <strong className="info-status">
                    <Check size={13} />

                    {activeConversation.status}
                  </strong>
                </div>

                <div className="info-location">
                  <MapPin size={15} />

                  <span>
                    Discuss a safe meeting location with the other user.
                  </span>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Messages;
