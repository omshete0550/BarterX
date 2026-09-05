import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Bell,
  Check,
  CheckCheck,
  CircleAlert,
  CircleCheck,
  CircleX,
  Inbox,
  RefreshCw,
  Repeat2,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";

import MainLayout from "../../layouts/MainLayout";
import Loader from "../../component/common/Loader";
import {
  deleteNotification,
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../../features/notifications/notificationSlice";

import "./Notifications.css";

const notificationTypes = {
  barter_request: { Icon: Repeat2, label: "Swap request" },
  barter_accepted: { Icon: CircleCheck, label: "Swap accepted" },
  barter_rejected: { Icon: CircleX, label: "Swap update" },
  barter_completed: { Icon: CheckCheck, label: "Swap completed" },
  rating_received: { Icon: Star, label: "New rating" },
};

const formatNotificationTime = (value) => {
  const date = new Date(value);
  const elapsedSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (Number.isNaN(date.getTime())) return "Recently";
  if (elapsedSeconds < 60) return "Just now";
  if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`;
  if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)}h ago`;
  if (elapsedSeconds < 604800) return `${Math.floor(elapsedSeconds / 86400)}d ago`;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  });
};

function Notifications() {
  const dispatch = useDispatch();
  const {
    items: notifications,
    unreadCount,
    loading,
    error,
  } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleRefresh = () => dispatch(fetchNotifications());
  const displayUnreadCount = unreadCount > 99 ? "99+" : unreadCount;

  return (
    <MainLayout>
      <div className="notifications-page">
        <header className="notifications-header">
          <div className="notifications-container notifications-header-content">
            <div>
              <span className="notifications-eyebrow">ACTIVITY CENTER</span>
              <h1>Notifications</h1>
              <p>Updates about your swaps, ratings, and marketplace activity.</p>
            </div>

            <div className="unread-summary" aria-label={`${unreadCount} unread notifications`}>
              <Bell size={19} aria-hidden="true" />
              <strong>{displayUnreadCount}</strong>
              <span>Unread</span>
            </div>
          </div>
        </header>

        <main className="notifications-main">
          <div className="notifications-container">
            <div className="notifications-layout">
              <section className="notifications-content" aria-labelledby="recent-activity-heading">
                <div className="notifications-toolbar">
                  <div>
                    <h2 id="recent-activity-heading">Recent activity</h2>
                    <p>
                      {notifications.length === 1
                        ? "1 notification"
                        : `${notifications.length} notifications`}
                    </p>
                  </div>

                  {unreadCount > 0 && (
                    <button className="mark-all-btn" onClick={() => dispatch(markAllNotificationsRead())}>
                      <CheckCheck size={17} aria-hidden="true" />
                      Mark all read
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="notifications-state">
                    <Loader text="Loading your notifications..." />
                  </div>
                ) : error ? (
                  <div className="notifications-state notifications-error" role="alert">
                    <CircleAlert size={34} aria-hidden="true" />
                    <h3>We couldn’t load your notifications</h3>
                    <p>{error}</p>
                    <button className="retry-btn" onClick={handleRefresh}>
                      <RefreshCw size={16} aria-hidden="true" />
                      Try again
                    </button>
                  </div>
                ) : notifications.length > 0 ? (
                  <div className="notification-list">
                    {notifications.map((notification) => {
                      const { Icon, label } = notificationTypes[notification.type] || {
                        Icon: Bell,
                        label: "Activity update",
                      };
                      const isUnread = !notification.isRead;

                      return (
                        <article
                          key={notification._id}
                          className={`notification-item ${isUnread ? "unread" : ""}`}
                        >
                          <div className="notification-visual">
                            {notification.sender?.avatar ? (
                              <img
                                src={notification.sender.avatar}
                                alt={`${notification.sender.name || "Sender"}'s profile`}
                              />
                            ) : (
                              <span className={`notification-icon ${notification.type || "default"}`}>
                                <Icon size={21} aria-hidden="true" />
                              </span>
                            )}
                            {isUnread && <span className="unread-dot" aria-label="Unread" />}
                          </div>

                          <div className="notification-info">
                            <div className="notification-title-row">
                              <h3>{notification.title}</h3>
                              {isUnread && <span className="new-label">New</span>}
                            </div>
                            <p>{notification.message}</p>
                            <span className="notification-time">
                              {formatNotificationTime(notification.createdAt)}
                              <span aria-hidden="true"> · </span>
                              {label}
                            </span>
                          </div>

                          <div className="notification-actions">
                            {isUnread && (
                              <button
                                className="notification-action-btn"
                                onClick={() => dispatch(markNotificationRead(notification._id))}
                                aria-label={`Mark “${notification.title}” as read`}
                                title="Mark as read"
                              >
                                <Check size={18} aria-hidden="true" />
                              </button>
                            )}
                            <button
                              className="notification-action-btn delete-notification-btn"
                              onClick={() => dispatch(deleteNotification(notification._id))}
                              aria-label={`Delete “${notification.title}”`}
                              title="Delete notification"
                            >
                              <Trash2 size={17} aria-hidden="true" />
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="notifications-state notifications-empty">
                    <span className="empty-icon"><Inbox size={34} aria-hidden="true" /></span>
                    <h3>You’re all caught up</h3>
                    <p>New marketplace activity will appear here.</p>
                  </div>
                )}
              </section>

              <aside className="notifications-sidebar" aria-label="Notification summary">
                <section className="activity-card">
                  <span className="activity-card-icon"><Sparkles size={20} aria-hidden="true" /></span>
                  <h2>Stay in the loop</h2>
                  <p>We’ll let you know when a swap request, rating, or other marketplace update needs your attention.</p>
                </section>

                <section className="notification-stats" aria-label="Notification statistics">
                  <div className="stat-item">
                    <strong>{displayUnreadCount}</strong>
                    <span>Unread</span>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <strong>{notifications.length}</strong>
                    <span>Total</span>
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  );
}

export default Notifications;
