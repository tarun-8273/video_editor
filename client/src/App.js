import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import VideoEditor from "./components/VideoEditor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="MainContent">
        <Sidebar />
        <div className="video-editor">
          <VideoEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
