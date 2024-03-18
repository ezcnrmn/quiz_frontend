import { useFieldArray } from "react-hook-form";
import { Button, Input, Label, VerticalContainer } from "../../styles/commonComponents";
import helpers from "../../helpers";

const RadioList = ({ control, nestIndex, register, errors, onChange }) => {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `questions[${nestIndex}].options`,
		rules: { minLength: 1 },
	});

	return (
		<div>
			<VerticalContainer $gap={5}>
				{fields.map((item, index) => (
					<Label key={item.id} $gap={5}>
						<Input
							type="radio"
							name={`options[${nestIndex}]`}
							id={`option[${nestIndex}][${index}]`}
							onChange={onChange(index)}
							// {...register(`questions[${nestIndex}].options[${index}].radio`)}
						/>
						<Input
							type="text"
							{...register(`questions[${nestIndex}].options[${index}].option`, { required: true })}
							aria-invalid={helpers.path(errors, ["questions", nestIndex, "options", index, "option"]) ? true : false}
						/>
						<Button type="button" onClick={() => remove(index)}>
							–
						</Button>
					</Label>
				))}

				<Button type="button" onClick={() => append({ option: "" })}>
					Add option
				</Button>
			</VerticalContainer>
		</div>
	);
};

export default RadioList;
