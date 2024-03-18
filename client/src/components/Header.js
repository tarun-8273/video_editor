import React from "react";
import "./Header.css"; // Create and style accordingly

function Header() {
  return (
    <div className="Header">
      <span>Trim Video</span>
      <div className="UserInfo">
        <span className="NotificationIcon">🔔</span>
        <div class="user-role">
        <span>Tarun Goyal</span>
        <span className="UserRole">Admin</span>
        </div>
        <div className="UserImagePlaceholder"></div>
      </div>
    </div>
  );
}

export default Header;
