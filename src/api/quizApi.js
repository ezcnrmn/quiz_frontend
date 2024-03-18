import api from "./api";

const loadQuizzes = async () => {
	const url = "/quiz";
	const response = api.get(url);
	return response;
};
const createQuiz = async (quiz) => {
	const url = "/quiz";
	const response = api.post(url, quiz);
	return response;
};
const editQuiz = async (quiz) => {
	const url = "/quiz";
	const response = api.patch(url, quiz);
	return response;
};
const deleteQuiz = async (quizId) => {
	const url = "/quiz";
	const response = api.delete(url, quizId);
	return response;
};

const loadQuiz = async (quizId) => {
	const url = `/quiz/${quizId}`;
	const response = api.get(url);
	return response;
};
const tryQuiz = async (quizId, answers) => {
	const url = `/quiz/${quizId}`;
	const response = api.post(url, answers);
	return response;
};

export default {
	loadQuizzes,
	createQuiz,
	editQuiz,
	deleteQuiz,

	loadQuiz,
	tryQuiz,
};
