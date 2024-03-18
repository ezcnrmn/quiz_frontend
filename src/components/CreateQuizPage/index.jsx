import { useForm } from "react-hook-form";
import { Button, Header2, Input, Label, Space } from "../../styles/commonComponents";
import QuestionList from "./QuestionList";
import { useMutation } from "@tanstack/react-query";
import quizApi from "../../api/quizApi";
import { MULTI_OPTION_SEPARATOR, QUIZ_TYPES } from "../../helpers/consts";

const CreateQuizPage = () => {
	const { mutate } = useMutation({
		mutationFn: (quiz) => quizApi.createQuiz(quiz),
	});

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const onSubmit = (rawData) => {
		rawData.answers = rawData.answers.map((answer, index) => {
			if (rawData.questions[index].type === QUIZ_TYPES.RADIO) {
				const answerIndex = Number.isNaN(Number(answer.value)) ? 0 : Number(answer.value);
				return rawData.questions[index].options[answerIndex].option;
			} else if (rawData.questions[index].type === QUIZ_TYPES.CHECKBOX) {
				const answerIndexes = answer.value ? answer.value.split(MULTI_OPTION_SEPARATOR) : [];
				return answerIndexes
					.map((answerIndex) => rawData.questions[index].options[answerIndex].option)
					.join(MULTI_OPTION_SEPARATOR);
			}
			return answer.value;
		});
		console.log("success", rawData);
		mutate(rawData);
	};

	const onError = (data) => console.log("errors", data);

	return (
		<div>
			<Header2>Create quiz</Header2>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<Label $before="Quiz name">
					<Input type="text" {...register("name", { required: true })} aria-invalid={errors.name ? true : false} />
				</Label>
				<Space />
				<Label $before="Author">
					<Input type="text" {...register("author")} />
				</Label>
				<Space />
				<QuestionList {...{ control, register, watch, errors }} />
				<Space />
				<Button $primary>Create quiz</Button>
			</form>
		</div>
	);
};

export default CreateQuizPage;
