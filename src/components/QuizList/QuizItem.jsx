import styled from "styled-components";
import { Header3, QuizId } from "../../styles/commonComponents";
import { Link } from "react-router-dom";

const QuizItemStyled = styled.li`
	list-style-type: none;
`;

const QuizItem = ({ quiz }) => {
	return (
		<Link to={`/quizzes/${quiz.id}`}>
			<QuizItemStyled>
				<Header3>{quiz.name || "***"}</Header3>
				<QuizId>{quiz.id}</QuizId>
			</QuizItemStyled>
		</Link>
	);
};

export default QuizItem;
