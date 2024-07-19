import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/quizquestion"
    : "http://localhost:8080/api/v1/quizquestion";

export async function createQuizQuestion(token, data) {
  return axios({
    method: "post",
    url: API_URL,
    headers: { Authorization: `Bearer ${token}` },
    data: data,
  });
}

export async function updateQuizQuestionById(token, quizQuestionId, data) {
  return axios({
    method: "patch",
    url: API_URL + `/${quizQuestionId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: data,
  });
}

export async function deleteQuizQuestionById(token, quizQuestionId) {
  return axios({
    method: "delete",
    url: API_URL + `/${quizQuestionId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}
