import React from "react";
import styled from "styled-components";
import quizApi from "../../api/quizApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading";
import QuizItem from "./QuizItem";
import { Header2, Space } from "../../styles/commonComponents";
import ErrorPage from "../ErrorPage";

const QuizListStyled = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const QuizList = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["quizList"],
		queryFn: quizApi.loadQuizzes,
	});

	if (isLoading) return <Loading />;

	if (error) return <ErrorPage message={error.message} />;

	return (
		<div>
			<Header2>List of quizzes</Header2>
			<QuizListStyled>
				{data.data.map((quiz) => (
					<React.Fragment key={quiz.id}>
						<QuizItem quiz={quiz} />
						<Space />
					</React.Fragment>
				))}
			</QuizListStyled>
		</div>
	);
};

export default QuizList;
