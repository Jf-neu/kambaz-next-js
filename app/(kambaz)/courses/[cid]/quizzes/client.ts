/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/api`;

export const findQuizzesForCourse = async (courseId: string) => {
  const r = await axiosWithCredentials.get(`${API}/courses/${courseId}/quizzes`);
  return r.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const r = await axiosWithCredentials.post(`${API}/courses/${courseId}/quizzes`, quiz);
  return r.data;
};

export const findQuizById = async (quizId: string) => {
  const r = await axiosWithCredentials.get(`${API}/quizzes/${quizId}`);
  return r.data;
};

export const updateQuiz = async (quiz: any) => {
  const r = await axiosWithCredentials.put(`${API}/quizzes/${quiz._id}`, quiz);
  return r.data;
};

export const deleteQuiz = async (quizId: string) => {
  const r = await axiosWithCredentials.delete(`${API}/quizzes/${quizId}`);
  return r.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const r = await axiosWithCredentials.get(`${API}/quizzes/${quizId}/questions`);
  return r.data;
};

export const createQuestion = async (quizId: string, question: any) => {
  const r = await axiosWithCredentials.post(`${API}/quizzes/${quizId}/questions`, question);
  return r.data;
};

export const updateQuestion = async (question: any) => {
  const r = await axiosWithCredentials.put(`${API}/questions/${question._id}`, question);
  return r.data;
};

export const deleteQuestion = async (questionId: string) => {
  const r = await axiosWithCredentials.delete(`${API}/questions/${questionId}`);
  return r.data;
};

export const getLastAttempt = async (quizId: string) => {
  const r = await axiosWithCredentials.get(`${API}/quizzes/${quizId}/attempts/last`);
  return r.data;
};

export const getAttemptCount = async (quizId: string) => {
  const r = await axiosWithCredentials.get(`${API}/quizzes/${quizId}/attempts/count`);
  return r.data;
};

export const submitAttempt = async (quizId: string, answers: any[]) => {
  const r = await axiosWithCredentials.post(`${API}/quizzes/${quizId}/attempts`, { answers });
  return r.data;
};
