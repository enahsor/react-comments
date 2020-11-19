import useSwr from "swr";

const baseUrl = `https://gentle-journey-87388.herokuapp.com`;

function fetchWithBase(additionalPath) {
  return fetch(`${baseUrl}/${additionalPath}`);
}

export function fetchVideos() {
  return fetchWithBase(`videos`).then((res) => res.json());
}

export function fetchVideo(id) {
  return fetchWithBase(`video/${id}`).then((res) => res.json());
}

export function fetchReplies(id) {
  return fetchWithBase(`replies/${id}`).then((res) => res.json());
}
