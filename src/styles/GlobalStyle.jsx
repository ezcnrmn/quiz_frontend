import { createGlobalStyle } from "styled-components";
import { backgroundColor } from "./variables";

const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;

		font-family: sans-serif;
	}

	body {
		background-color: ${backgroundColor};
	}

	a {
		color: currentColor;
		text-decoration: none;
	}
`;

export default GlobalStyle;
