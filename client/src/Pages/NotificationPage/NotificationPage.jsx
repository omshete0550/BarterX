import { useEffect, useState } from 'react'
import './NotificationPage.css'

function NotificationsPage() {
    const [notifications, setNotifications] = useState([
        {
            "id": "1",
            "author": {
                "name": "John Smith",
                "href": "#",
                "src": './hamza.png'
            },
            "text": "liked your post",
            "link": {
                "href": "#",
                "text": "2 mins ago"
            },
            "isUnread": true,
            "time": "2 mins ago"
        },
        {
            "id": "2",
            "author": {
                "name": "John Smith",
                "href": "#",
                "src": './hamza.png'
            },
            "text": "liked your post",
            "link": {
                "href": "#",
                "text": "2 mins ago"
            },
            "isUnread": true,
            "time": "2 mins ago"
        },
        {
            "id": "3",
            "author": {
                "name": "John Smith",
                "href": "#",
                "src": './hamza.png'
            },
            "text": "liked your post",
            "link": {
                "href": "#",
                "text": "2 mins ago"
            },
            "isUnread": true,
            "time": "2 mins ago"
        },
        {
            "id": "4",
            "author": {
                "name": "John Smith",
                "href": "#",
                "src": './hamza.png'
            },
            "text": "liked your post",
            "link": {
                "href": "#",
                "text": "2 mins ago"
            },
            "isUnread": true,
            "time": "2 mins ago"
        },
        {
            "id": "5",
            "author": {
                "name": "John Smith",
                "href": "#",
                "src": './hamza.png'
            },
            "text": "liked your post",
            "link": {
                "href": "#",
                "text": "2 mins ago"
            },
            "isUnread": true,
            "time": "2 mins ago"
        },
    ])

    function markAllUnread() {
        setNotifications((prev) => prev.map(n => ({ ...n, isUnread: false })))
    }

    function handleNotificationClick(id) {
        setNotifications((prev) => prev.map(n => (
            n.id === id
                ? { ...n, isUnread: false }
                : n
        )))
    }

    return (
        <div className="App">
            <div className="container">
                <header>
                    <div className="title">
                        <h1>Notifications</h1>
                        <span className="badge">{notifications && notifications.filter(n => n.isUnread).length}</span>
                    </div>
                    <button id="mark" onClick={markAllUnread}>Mark all as read</button>
                </header><div className="wrapper">

                    {notifications && notifications.map((n) => (
                        <div key={n.id} onClick={() => handleNotificationClick(n.id)} className="notification" data-unread={n.isUnread}>
                            <div className="notification-content">
                                <img src={n.author.src} alt={n.author.name} className="headshot" />
                                <div className="post">
                                    <div>
                                        <div>
                                            <div>
                                                <a href={n.author.href}>
                                                    {n.author.name}
                                                </a>
                                                <span> {n.text}</span>
                                                {n.link && (
                                                    <a href={n.link.href}> {n.link.text}</a>
                                                )}
                                                {n.isUnread && (
                                                    <span className="isUnread"></span>
                                                )}
                                            </div>
                                        </div>
                                        <p className="time">{n.time}</p>
                                    </div>
                                    {n.privateMessage && (
                                        <p className="privateMessage">{n.privateMessage}</p>
                                    )}
                                </div>
                            </div>
                            {n.image && (<a href={n.image.href}>
                                <img src={n.image.src} alt={n.image.alt} />
                            </a>)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NotificationsPage