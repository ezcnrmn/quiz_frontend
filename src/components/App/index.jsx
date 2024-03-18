import { Routes, Route } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Layout from "../Layout";
import QuizList from "../QuizList";
import CreateQuizPage from "../CreateQuizPage";
import QuizPage from "../QuizPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<QuizList />} />
				<Route path="quizzes" element={<QuizList />} />
				<Route path="quizzes/:id" element={<QuizPage />} />
				<Route path="create-quiz" element={<CreateQuizPage />} />

				<Route path="*" element={<ErrorPage message="Page is not exist" />} />
			</Route>
		</Routes>
	);
};

export default App;
