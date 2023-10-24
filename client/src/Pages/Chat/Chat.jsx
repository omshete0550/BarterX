import React, { useState } from 'react';
import {BiPhoneCall, BiVideo, BiInfoCircle} from "react-icons/bi"
import "./Chat.css";
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
const [message, sendMessage] = useState("");
  // Define functions to handle input changes and message sending

  return (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
            <div className="wrap">
            <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
            <p>Mike Ross</p>
            <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
            <div id="status-options">
                <ul>
                <li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
                <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
                </ul>
            </div>
            <div id="expanded">
                <label htmlFor="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
                <input name="twitter" type="text" value="mikeross" />
                <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
                <input name="twitter" type="text" value="ross81" />
                <label htmlFor="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
                <input name="twitter" type="text" value="mike.ross" />
            </div>
            </div>
        </div>
        <div id="search">
            <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
            <input type="text" placeholder="Search contacts..." />
        </div>
        <div id="contacts">
            <ul>
            <li className="contact">
                <div className="wrap">
                <span className="contact-status online"></span>
                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                <div className="meta">
                    <p className="name">Louis Litt</p>
                    <p className="preview">You just got LITT up, Mike.</p>
                </div>
                </div>
            </li>
            <li className="contact">
                <div className="wrap">
                <span className="contact-status online"></span>
                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                <div className="meta">
                    <p className="name">Mark Tyson</p>
                    <p className="preview">You just got LITT up, Mike.</p>
                </div>
                </div>
            </li>
            {/* Add more contact items here */}
            </ul>
        </div>
        <div id="bottom-bar">
            <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add contact</span></button>
            <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
        </div>
      </div>
      <div className="content">
        <div className="contact-profile">
          {/* Contact profile content */}
          <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>Harvey Specter</p>
            <div className="social-media">
                <BiPhoneCall size="1.3em" className="icon" />
                <BiVideo size="1.3em" className="icon" />
                <BiInfoCircle size="1.3em" className="icon" />
            </div>
        </div>
        <div className="messages">
          <ul>
            {messages.map((message, index) => (
              <li
                key={index}
                className={message.sender === 'Mike' ? 'sent' : 'replies'}
              >
                <img src={message.senderAvatar} alt={message.sender} />
                <p>{message.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="message-input">
          <div className="wrap">
            <input
              type="text"
              placeholder="Write your message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
            <button
              className="submit"
              onClick={() => sendMessage(messageInput)}
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
