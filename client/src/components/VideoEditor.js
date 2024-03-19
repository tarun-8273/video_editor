import React, { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedVideo(acceptedFiles[0]);
  }, []);

  const handleStartChange = (e) => {
    setStartTime(e.target.value);
    videoRef.current.currentTime = e.target.value;
  };

  const handleEndChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleReset = () => {
    setSelectedVideo(null);
    setStartTime(0);
    setEndTime(0);
    if (videoRef.current) {
      videoRef.current.src = "";
      videoRef.current.currentTime = 0;
    }
  };

  const handleDownload = () => {
    if (videoRef.current.src) {
      const trimmedVideoUrl = videoRef.current.src;
      const a = document.createElement("a");
      a.href = trimmedVideoUrl;
      a.download = "trimmed_video.mp4";
      a.click();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "video/*",
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag & drop a video file here, or click to select one</p>
      </div>
      {selectedVideo && (
        <div>
          <video ref={videoRef} controls width="500">
            <source src={URL.createObjectURL(selectedVideo)} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <br />
          <label>
            Start Time:
            <input
              type="range"
              min="0"
              max={videoRef.current ? videoRef.current.duration : 0}
              step="1"
              value={startTime}
              onChange={handleStartChange}
            />
            {startTime}s
          </label>
          <br />
          <label>
            End Time:
            <input
              type="range"
              min={startTime}
              max={videoRef.current ? videoRef.current.duration : 0}
              step="1"
              value={endTime}
              onChange={handleEndChange}
            />
            {endTime}s
          </label>
          <br />
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default VideoPlayer;


// // client/src/components/VideoEditor.js
// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import { VideoTrimmer } from 'react-video-trimmer';
// import 'react-video-trimmer/dist/style.css';
// import './VideoEditor.css';

// const VideoEditor = () => {
//   const [videoFile, setVideoFile] = useState(null);
//   const [trimmedVideo, setTrimmedVideo] = useState(null);
//   const videoRef = useRef(null);

//   const handleFileChange = (file) => {
//     setVideoFile(file);
//     setTrimmedVideo(null);
//     // Reset video playback
//     if (videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//     }
//   };

//   const handleTrim = async (startTime, endTime) => {
//     try {
//       const formData = new FormData();
//       formData.append('video', videoFile);
//       formData.append('startTime', startTime);
//       formData.append('endTime', endTime);

//       const response = await axios.post('http://localhost:3001/upload', formData);
//       setTrimmedVideo(response.data);

//       // Play the trimmed video
//       if (videoRef.current) {
//         videoRef.current.load(); // Ensure the video is reloaded
//         videoRef.current.play();
//       }
//     } catch (error) {
//       console.error('Error trimming video:', error);
//       alert('Error trimming video.');
//     }
//   };
//

//   const handleDownload = () => {
//     if (trimmedVideo) {
//       const downloadLink = document.createElement('a');
//       const url = URL.createObjectURL(new Blob([trimmedVideo], { type: 'video/mp4' }));
//       downloadLink.href = url;
//       downloadLink.download = 'trimmed_video.mp4';
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);
//     }
//   };

//   return (
//     <div className="VideoEditor">
//       <div className="controls">
//         <VideoTrimmer onChange={handleTrim} onFileChange={handleFileChange} />
//         {videoFile && (
//           <div>
//             <p>Selected Video: {videoFile.name}</p>
//             <video controls width="100%" ref={videoRef}>
//               <source src={URL.createObjectURL(videoFile)} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>
//         )}
//       </div>

//       {trimmedVideo && (
//         <div className="TrimmedVideoContainer">
//           <p>Trimmed Video:</p>
//           <video controls width="100%" ref={videoRef}>
//             <source src={`data:video/mp4;base64,${trimmedVideo}`} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button className="download-btn" onClick={handleDownload}>Download Trimmed Video</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoEditor;

