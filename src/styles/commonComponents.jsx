import styled from "styled-components";
import { errorColor, mainColor } from "./variables";

export const Header1 = styled.h1`
	margin-bottom: 20px;
`;
export const Header2 = styled.h2`
	margin-bottom: 20px;
`;
export const Header3 = styled.h3`
	margin-bottom: 10px;
`;
export const Header4 = styled.h4`
	margin-bottom: 10px;
`;
export const Header5 = styled.h5`
	margin-bottom: 10px;
`;
export const Header6 = styled.h6`
	margin-bottom: 10px;
`;

export const VerticalContainer = styled.div`
	& > * + * {
		margin-top: ${(props) => props.$gap ?? 10}px;
	}
`;
export const HorizontalContainer = styled.div`
	& > * + * {
		margin-left: ${(props) => props.$gap ?? 10}px;
	}
`;

export const QuizId = styled.div`
	font-style: italic;
	font-size: 0.8em;
`;

export const Space = styled.br`
	display: block;
	content: "";
	height: 1px;
	background-color: black;
	margin: 10px 0;
`;

export const Label = styled.label`
	display: flex;
	align-items: center;
	gap: ${(props) => props.$gap ?? 10}px;

	& > input[type="text"],
	& > input[type="number"],
	& > select {
		flex-grow: 1;
	}

	&::before {
		content: ${(props) => (props.$before ? '"' + props.$before + '"' : "none")};
	}

	&::after {
		content: ${(props) => (props.$after ? '"' + props.$after + '"' : "none")};
	}
`;

export const Button = styled.button`
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid black;
	background-color: ${(props) => (props.$primary ? mainColor : "white")};
	cursor: pointer;
`;

export const Input = styled.input`
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid black;

	&[aria-invalid="true"] {
		border: 1px solid ${errorColor};
	}

	&[type="radio"],
	&[type="checkbox"] {
		position: relative;
		padding: 10px;
		background-color: white;
		cursor: pointer;
		border-radius: 50%;

		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		outline: none;
	}
	&[type="checkbox"] {
		border-radius: 5px;
	}

	&[type="radio"]:checked::after,
	&[type="checkbox"]:checked::after {
		content: "";

		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;

		background-color: currentColor;
		width: 14px;
		height: 14px;
		border-radius: 50%;
	}
	&[type="checkbox"]:checked::after {
		border-radius: 2px;
	}
`;

export const Select = styled.select`
	padding: 5px 10px;
	border-radius: 5px;
	border: 1px solid black;
`;

export const ErrorText = styled.div`
	margin-top: ${(props) => props.$gap ?? 10}px;
	color: ${errorColor};

	&::after {
		content: "${(props) => props.$text}";
	}
`;
