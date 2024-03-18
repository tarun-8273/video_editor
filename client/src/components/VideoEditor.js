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
