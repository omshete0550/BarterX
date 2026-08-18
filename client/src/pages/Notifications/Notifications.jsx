import { useState } from "react";
import "./Notifications.css";

const initialNotifications = [
  {
    id: 1,
    type: "swap",
    title: "New swap request",
    message:
      "Rahul Sharma wants to swap his Gaming Keyboard for your Sony WH-1000XM5.",
    time: "5 min ago",
    unread: true,
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    id: 2,
    type: "accepted",
    title: "Swap request accepted",
    message: "Priya Patil accepted your swap request for MacBook Air M1.",
    time: "1 hour ago",
    unread: true,
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    id: 3,
    type: "message",
    title: "New message",
    message: "Amit Kulkarni sent you a message about the Mountain Bike.",
    time: "2 hours ago",
    unread: true,
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 4,
    type: "wishlist",
    title: "Wishlist update",
    message: "A product from your wishlist is now available for swapping.",
    time: "4 hours ago",
    unread: false,
    avatar: null,
  },
  {
    id: 5,
    type: "swap",
    title: "Swap request received",
    message: "Neha Joshi sent you a swap request for your Canon DSLR Camera.",
    time: "Yesterday",
    unread: false,
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    id: 6,
    type: "system",
    title: "Welcome to BarterX!",
    message: "Complete your profile to make your listings more trustworthy.",
    time: "2 days ago",
    unread: false,
    avatar: null,
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "swap":
        return "⇄";

      case "accepted":
        return "✓";

      case "message":
        return "•••";

      case "wishlist":
        return "♡";

      case "system":
        return "✦";

      default:
        return "•";
    }
  };

  return (
    <div className="notifications-page">
      {/* Header */}
      <section className="notifications-header">
        <div className="notifications-container">
          <div className="notifications-heading">
            <div>
              <span className="notifications-eyebrow">ACTIVITY CENTER</span>

              <h1>Notifications</h1>

              <p>
                Stay updated with your swaps, messages, and marketplace
                activity.
              </p>
            </div>

            {unreadCount > 0 && (
              <div className="unread-summary">
                <span>{unreadCount}</span>
                <p>Unread</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="notifications-main">
        <div className="notifications-container">
          <div className="notifications-layout">
            {/* Notifications */}
            <section className="notifications-content">
              <div className="notifications-toolbar">
                <div>
                  <h2>Recent Activity</h2>

                  <span>{notifications.length} notifications</span>
                </div>

                {unreadCount > 0 && (
                  <button className="mark-all-btn" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                )}
              </div>

              {notifications.length > 0 ? (
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <article
                      key={notification.id}
                      className={`notification-item ${
                        notification.unread ? "unread" : ""
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      {/* Avatar / Icon */}
                      <div className="notification-visual">
                        {notification.avatar ? (
                          <img src={notification.avatar} alt="" />
                        ) : (
                          <div
                            className={`notification-icon notification-icon-${notification.type}`}
                          >
                            {getIcon(notification.type)}
                          </div>
                        )}

                        {notification.unread && (
                          <span className="unread-dot"></span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="notification-info">
                        <div className="notification-title-row">
                          <h3>{notification.title}</h3>

                          {notification.unread && (
                            <span className="new-label">NEW</span>
                          )}
                        </div>

                        <p>{notification.message}</p>

                        <span className="notification-time">
                          {notification.time}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="notification-actions">
                        <button
                          className="notification-menu-btn"
                          onClick={(e) => {
                            e.stopPropagation();

                            removeNotification(notification.id);
                          }}
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="notifications-empty">
                  <div className="empty-icon">♡</div>

                  <h3>You're all caught up</h3>

                  <p>You don't have any notifications right now.</p>
                </div>
              )}
            </section>

            {/* Sidebar */}
            <aside className="notifications-sidebar">
              <div className="activity-card">
                <div className="activity-card-icon">✦</div>

                <h3>Stay in the loop</h3>

                <p>
                  We'll notify you when someone sends a swap request, replies to
                  your messages, or interacts with your listings.
                </p>
              </div>

              <div className="notification-stats">
                <div className="stat-item">
                  <span className="stat-number">{unreadCount}</span>

                  <span className="stat-label">Unread</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                  <span className="stat-number">{notifications.length}</span>

                  <span className="stat-label">Total</span>
                </div>
              </div>

              <div className="notification-help">
                <span>Need help?</span>

                <a href="/contact">Contact BarterX Support →</a>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Notifications;
