const baseUrl = `https://gentle-journey-87388.herokuapp.com`;

export function fetchComments() {
  return fetch(`${baseUrl}/comments`);
}

export function fetchComment(id) {
  return fetch(`${baseUrl}/comment/${id}`);
}

export function fetchCommentsArr() {
  return fetch(`${baseUrl}/comments_arr`);
}

export function fetchUser(id) {
  return fetch(`${baseUrl}/user/${id}`);
}
