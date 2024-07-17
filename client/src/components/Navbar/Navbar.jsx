// this was pulled from Lama dev
// https://www.youtube.com/watch?v=7vVqMR96T5o

import "./navbar.css";
import { useEffect, useState } from "react";
import Notification from "../../assets/svgs/notification.svg";
import Message from "../../assets/svgs/message.svg";

const Navbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="icons">
      <div className="icon" onClick={() => setOpen(!open)}>
        <img src={Notification} className="iconImg" alt="" />
        {notifications.length > 0 && (
          <div className="counter">{notifications.length}</div>
        )}
      </div>
      <div className="icon" onClick={() => setOpen(!open)}>
        <img src={Message} className="iconImg" alt="" />
      </div>
      {open && (
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
