import React from "react";
import { useForm } from "react-hook-form";
import { MULTI_OPTION_SEPARATOR, QUIZ_TYPES } from "../../helpers/consts";
import { Button, ErrorText, Header3, Input, Label, Space, VerticalContainer } from "../../styles/commonComponents";
import { useMutation } from "@tanstack/react-query";
import quizApi from "../../api/quizApi";

const getErrorsByField = (questions, errors) => {
	let errorIndex = 0;

	const errorsByField = questions.map((question, index) =>
		errors[errorIndex] && errors[errorIndex].questionIndex === index
			? { rightAnswer: errors[errorIndex++].rightAnswer }
			: {},
	);

	return errorsByField;
};

const TryQuiz = ({ quizId, questions }) => {
	const {
		mutate,
		data: verifiedErrors,
		isSuccess,
	} = useMutation({
		mutationKey: ["answers", quizId],
		mutationFn: async (answers) => quizApi.tryQuiz(quizId, answers),
	});

	const errorsByField = isSuccess ? getErrorsByField(questions, verifiedErrors.data.errors) : Array(questions.length);

	const {
		register,
		handleSubmit,
		// formState: { errors },
		watch,
		setValue,
	} = useForm({ defaultValues: { answers: Array(questions.length).fill("") } });

	const onSubmit = (rawData) => {
		mutate(rawData.answers);
	};

	const onError = (data) => console.log("errors", data);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<ol>
					{questions.map((question, index) => {
						let input;
						switch (question.type) {
							case QUIZ_TYPES.TEXT:
								input = (
									<Label>
										<Input type="text" {...register(`answers.${index}`, {})} />
									</Label>
								);
								break;
							case QUIZ_TYPES.NUMBER:
								input = (
									<Label>
										<Input type="number" {...register(`answers.${index}`)} />
									</Label>
								);
								break;
							case QUIZ_TYPES.RADIO:
								input = (
									<VerticalContainer $gap={5}>
										{question.options.map((option, optionIndex) => (
											<Label key={optionIndex} $after={option.option}>
												<Input
													type="radio"
													name={question.title}
													id={option.option}
													onChange={() => {
														setValue(`answers.${index}`, option.option);
													}}
												/>
											</Label>
										))}
									</VerticalContainer>
								);
								break;
							case QUIZ_TYPES.CHECKBOX:
								input = (
									<VerticalContainer $gap={5}>
										{question.options.map((option, optionIndex) => (
											<Label key={optionIndex} $after={option.option}>
												<Input
													type="checkbox"
													name={question.title}
													id={option.option}
													onChange={(event) => {
														const currentValue = watch(`answers.${index}`);
														let splittedValue = currentValue ? currentValue.split(MULTI_OPTION_SEPARATOR) : [];
														if (event.target.checked) {
															splittedValue.push(option.option);
															splittedValue.sort((a, b) => Number(a) - Number(b));
														} else {
															splittedValue = splittedValue.filter((item) => item != option.option);
														}
														setValue(`answers.${index}`, splittedValue.join(MULTI_OPTION_SEPARATOR));
													}}
												/>
											</Label>
										))}
									</VerticalContainer>
								);
								break;
						}
						return (
							<React.Fragment key={index}>
								<li>
									<Header3>{question.title}</Header3>
									{input}
									<ErrorText
										$text={
											isSuccess &&
											errorsByField[index].rightAnswer &&
											`Wrong! Answer: ${errorsByField[index].rightAnswer}`
										}
									/>
								</li>
								<Space />
							</React.Fragment>
						);
					})}
				</ol>

				<Button $primary> submit </Button>
			</form>

			{isSuccess && (
				<>
					<Space />
					{verifiedErrors.data.isCorrect ? (
						<Header3>Test is passed</Header3>
					) : (
						<Header3>{`Test is not passed! ${verifiedErrors.data.errors.length} error(s)`}</Header3>
					)}
				</>
			)}
		</div>
	);
};

export default TryQuiz;
