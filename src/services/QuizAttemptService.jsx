import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/quizattempts"
    : "http://localhost:8080/api/v1/quizattempts";

export async function getQuizAttempts(token, page = 0, size = 5, title = null) {
  return axios({
    method: "get",
    url: API_URL,
    headers: { Authorization: `Bearer ${token}` },
    params: { page: page, size: size, title: title },
  });
}

export async function getQuizAttempt(token, quizAttemptId) {
  const headers = token ? { Authorization: `Bearer ${token}` } : null;
  return axios({
    method: "get",
    url: API_URL + `/${quizAttemptId}`,
    headers: headers,
  });
}

export async function createQuizAttemptForUser(token, data) {
  const headers = token ? { Authorization: `Bearer ${token}` } : null;
  return axios({
    method: "post",
    url: API_URL,
    headers: headers,
    data: data,
  });
}
