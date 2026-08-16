import { useEffect, useRef, useState } from "react";
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

import conversationsData from "../../data/conversations";

import "./Messages.css";

function Messages() {
  const [conversations, setConversations] = useState(conversationsData);

  const [activeId, setActiveId] = useState(conversationsData[0]?.id);

  const [message, setMessage] = useState("");

  const [search, setSearch] = useState("");

  const [showInfo, setShowInfo] = useState(false);

  const [mobileChat, setMobileChat] = useState(false);

  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeId,
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

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              unread: 0,
            }
          : conversation,
      ),
    );
  };

  /*
   * Send message
   */
  const sendMessage = (event) => {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || !activeConversation) {
      return;
    }

    const newMessage = {
      id: activeConversation.messages.length + 1,

      sender: "me",

      text: trimmedMessage,

      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeId
          ? {
              ...conversation,

              lastMessage: trimmedMessage,

              lastMessageTime: "Just now",

              messages: [...conversation.messages, newMessage],
            }
          : conversation,
      ),
    );

    setMessage("");
  };

  /*
   * No active conversation
   */
  if (!activeConversation) {
    return null;
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
                        conversation.id === activeId ? "active" : ""
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
                  <Send size={16} />
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
