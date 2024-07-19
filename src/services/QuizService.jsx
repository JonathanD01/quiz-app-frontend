import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/quizzes"
    : "http://localhost:8080/api/v1/quizzes";

export async function getQuizzes(token, page, title = null) {
  return axios({
    method: "get",
    url: API_URL,
    headers: { Authorization: `Bearer ${token}` },
    params: { title: title, page: page, size: 3 },
  });
}

export async function getQuizById(token, quizId) {
  return axios({
    method: "get",
    url: API_URL + `/${quizId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getQuizByLink(token, quizLink) {
  const headers = token ? { Authorization: `Bearer ${token}` } : null;
  return axios({
    method: "get",
    url: API_URL + `/link/${quizLink}`,
    headers: headers,
  });
}

export async function updateQuizById(token, quizId, data) {
  return axios({
    method: "patch",
    url: API_URL + `/${quizId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: data,
  });
}

export async function deleteQuizById(token, quizId) {
  return axios({
    method: "delete",
    url: API_URL + `/${quizId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createQuizWithAI(token, language) {
  var file = document.getElementById("file").files[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language);

  return axios({
    method: "post",
    url: API_URL + `/ai`,
    headers: { Authorization: `Bearer ${token}` },
    data: formData,
  });
}
