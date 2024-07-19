import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "/api/v1/quizansweroption"
    : "http://localhost:8080/api/v1/quizansweroption";

export async function updateQuizAnswerOptionById(
  token,
  quizAnswerOptionId,
  data
) {
  return axios({
    method: "patch",
    url: API_URL + `/${quizAnswerOptionId}`,
    headers: { Authorization: `Bearer ${token}` },
    data: data,
  });
}

export async function createQuizAnswerOptionById(token, data) {
  return axios({
    method: "post",
    url: API_URL,
    headers: { Authorization: `Bearer ${token}` },
    data: data,
  });
}

export async function deleteQuizAnswerOptionById(token, quizAnswerOptionId) {
  return axios({
    method: "delete",
    url: API_URL + `/${quizAnswerOptionId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
}
