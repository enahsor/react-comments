import React, { useEffect } from "react";
import Comments from "./components/Comments";
import { fetchCommentsArr } from "./api";

export default function App() {
  const [comments, setComments] = React.useState([]);

  useEffect(() => {
    fetchCommentsArr()
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, []);

  return (
    <div className="App">
      <Comments comments={comments} />
    </div>
  );
}
