import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="TopRow">
        <div className="CircleIcon"></div>
        <div className="TextColumn">
          <span className="Icon">XYZ</span>
          <p>Awesome Software</p>
        </div>
      </div>
      <div className="VideoOption"> 🚰 Videos</div>
    </div>
  );
}

export default Sidebar;
