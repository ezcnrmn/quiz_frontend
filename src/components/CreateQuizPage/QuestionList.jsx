import React from "react";
import { useFieldArray } from "react-hook-form";
import RadioList from "./RadioList";
import CheckboxList from "./CheckboxList";
import { MULTI_OPTION_SEPARATOR, QUIZ_TYPES } from "../../helpers/consts";
import { Button, Input, Label, Select, Space, VerticalContainer } from "../../styles/commonComponents";
import styled from "styled-components";
import helpers from "../../helpers";

const QuestionHeader = styled.div`
	display: flex;
	gap: 5px;

	& > select {
		flex-grow: 1;
	}
`;

const QuestionList = ({ control, register, watch, errors }) => {
	const {
		fields: questionFields,
		append: appendQuestion,
		remove: removeQuestion,
	} = useFieldArray({ name: "questions", control, rules: { minLength: 1 } });
	const {
		append: appendAnswer,
		remove: removeAnswer,
		update: updateAnswer,
	} = useFieldArray({ name: "answers", control });

	const onAddQuestion = () => {
		appendQuestion({ title: "", type: QUIZ_TYPES.TEXT, options: [] });
		appendAnswer({ value: "" });
	};

	const onRemoveQuestion = (index) => () => {
		removeQuestion(index);
		removeAnswer(index);
	};

	const getAnswerField = (index) => {
		const selectedOption = watch(`questions.${index}.type`);
		switch (selectedOption) {
			case QUIZ_TYPES.TEXT:
				return (
					<div>
						<Label $before="Answer">
							<Input
								type="text"
								{...register(`answers.${index}.value`, { required: true })}
								aria-invalid={helpers.path(errors, ["answers", index, "value"]) ? true : false}
							/>
						</Label>
					</div>
				);
			case QUIZ_TYPES.NUMBER:
				return (
					<div>
						<Label $before="Answer">
							<Input
								type="number"
								{...register(`answers.${index}.value`, { required: true })}
								aria-invalid={helpers.path(errors, ["answers", index, "value"]) ? true : false}
							/>
						</Label>
					</div>
				);
			case QUIZ_TYPES.RADIO: {
				const onChange = (radioIndex) => () => {
					updateAnswer(index, { value: radioIndex.toString() });
				};
				return (
					<>
						<RadioList nestIndex={index} {...{ control, register, onChange, errors }} />
						<input type="hidden" {...register(`answers.${index}.value`, { required: false })} />
					</>
				);
			}
			case QUIZ_TYPES.CHECKBOX: {
				const onChange = (checkboxIndex, checked) => {
					let currentValue = watch(`answers.${index}.value`)
						? watch(`answers.${index}.value`).split(MULTI_OPTION_SEPARATOR)
						: [];
					if (checked) {
						currentValue.push(checkboxIndex);
						currentValue.sort((a, b) => Number(a) - Number(b));
					} else {
						currentValue = currentValue.filter((item) => item != checkboxIndex);
					}
					updateAnswer(index, { value: currentValue.join(MULTI_OPTION_SEPARATOR) });
				};
				return (
					<>
						<CheckboxList nestIndex={index} {...{ control, register, onChange, errors }} />
						<input type="hidden" {...register(`answers.${index}.value`, { required: false })} />
					</>
				);
			}
		}
	};

	return (
		<div>
			<ol>
				{questionFields.map((field, index) => (
					<React.Fragment key={field.id}>
						<li>
							<VerticalContainer $gap={5}>
								<QuestionHeader>
									<Select {...register(`questions.${index}.type`)}>
										<option value={QUIZ_TYPES.RADIO}>Single option</option>
										<option value={QUIZ_TYPES.CHECKBOX}>Multi options</option>
										<option value={QUIZ_TYPES.TEXT}>Text</option>
										<option value={QUIZ_TYPES.NUMBER}>Number</option>
									</Select>
									<Button type="button" onClick={onRemoveQuestion(index)}>
										Delete question
									</Button>
								</QuestionHeader>

								<Label $before="Text of the question">
									<Input
										type="text"
										{...register(`questions.${index}.title`, { required: true })}
										aria-invalid={helpers.path(errors, ["questions", index, "title"]) ? true : false}
									/>
								</Label>

								{getAnswerField(index)}
							</VerticalContainer>
							<Space />
						</li>
					</React.Fragment>
				))}
			</ol>

			<div>
				<Button type="button" onClick={onAddQuestion}>
					Add question
				</Button>
			</div>
		</div>
	);
};

export default QuestionList;
