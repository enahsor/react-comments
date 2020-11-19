import React, { useEffect, useState } from "react";
import Comments from "./components/Comments";
import Videos from "./components/Videos";
import { fetchVideos } from "./api";
import useSwr from "swr";

export default function App() {
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);
  const [status, setStatus] = useState("idle");
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    setStatus("pending");
    fetchVideos()
      .then((data) => {
        setVideos(data);
        setStatus("resolved");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("rejected");
      });
  }, []);

  if (status === "idle") {
    return <p>Getting ready to fetch videos</p>;
  } else if (status === "pending") {
    return <p>Loading..</p>;
  } else if (status === "resolved") {
    return (
      <div className="App" style={{ width: "100%" }}>
        <Videos videos={videos} setVideo={setCurrentVideo} />
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            margin: "100px auto"
          }}
        >
          <Comments currentVideo={currentVideo} />
        </div>
      </div>
    );
  } else if (status === "rejected") {
    return <p>Something went wrong</p>;
  }
}
