import styled from "styled-components";
import { headerColor, mainColor } from "../../styles/variables";

export const AppComponent = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

export const Header = styled.header`
	padding: 10px;
	background-color: ${headerColor};
`;
export const Main = styled.main`
	padding: 10px;
	flex-shrink: 1;

	height: 100%;

	overflow-y: auto;
`;
export const MainContent = styled.div`
	margin-left: auto;
	margin-right: auto;
	max-width: 1080px;
`;
export const Footer = styled.footer`
	padding: 10px;
	background-color: ${headerColor};
`;

export const Navigation = styled.nav`
	display: flex;
	gap: 10px;
`;
export const NavigationItem = styled.div`
	& > a {
		text-transform: uppercase;
		font-weight: 600;

		display: block;

		padding: 5px 10px;
		border-bottom: 2px solid transparent;
	}
	& > a.active {
		border-bottom: 2px solid ${mainColor};
	}
`;
