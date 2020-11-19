import React from "react";
import { Wrapper } from "./styles";
import Video from "../Video";

function Videos({ videos, setVideo }) {
  return (
    <Wrapper>
      {videos.map((video) => (
        <Video key={video} id={video} setVideo={setVideo} />
      ))}
    </Wrapper>
  );
}

export default Videos;
