import { useFieldArray } from "react-hook-form";
import { Button, Input, Label, VerticalContainer } from "../../styles/commonComponents";
import helpers from "../../helpers";

const CheckboxList = ({ control, nestIndex, register, onChange, errors }) => {
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
							type="checkbox"
							name={`options[${nestIndex}]`}
							id={`option[${nestIndex}][${index}]`}
							onChange={(event) => {
								onChange(index, event.target.checked);
							}}
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

export default CheckboxList;
