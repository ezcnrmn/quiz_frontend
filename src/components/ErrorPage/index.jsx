import { Header2 } from "../../styles/commonComponents";

const ErrorPage = ({ message }) => {
	return (
		<div>
			<Header2>Error!</Header2>
			{message} :(
		</div>
	);
};

export default ErrorPage;
