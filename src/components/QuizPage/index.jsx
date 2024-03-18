import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import quizApi from "../../api/quizApi";
import Loading from "../Loading";
import ErrorPage from "../ErrorPage";
import { Header2, QuizId, Space } from "../../styles/commonComponents";
import TryQuiz from "./TryQuiz";

const QuizPage = () => {
	let { id } = useParams();
	const { isLoading, isSuccess, error, data } = useQuery({
		queryKey: ["quiz", id],
		queryFn: () => quizApi.loadQuiz(id),
	});

	if (isLoading) return <Loading />;

	if (error) return <ErrorPage message={error.message} />;

	return (
		<div>
			<QuizId>{data.data.id}</QuizId>
			<Header2>Quiz: {data.data.name || "***"}</Header2>
			<div>
				by <strong>{data.data.author || "anonymous"}</strong>
			</div>

			<Space />

			{isSuccess && data.data.questions ? (
				<TryQuiz quizId={id} questions={data.data.questions} />
			) : (
				"There are no questions"
			)}
			{/* 
			<Space />
			<pre>{JSON.stringify(data.data, null, 2)}</pre> */}
		</div>
	);
};

export default QuizPage;
