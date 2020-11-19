import React from "react";
import { Button } from "./styles";

function Video({ id, setVideo }) {
  function handleClick(e) {
    setVideo(id);
  }

  return <Button onClick={handleClick}>{id}</Button>;
}

export default Video;
