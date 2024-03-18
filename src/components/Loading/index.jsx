import styled from "styled-components";
import { mainColor } from "../../styles/variables";

const size = 100;
const duration = 1.3;

const Container = styled.div`
	height: ${size}px;
	display: flex;
	justify-content: center;
	margin-top: 20px;
	margin-bottom: 20px;
`;

const LoadingStyled = styled.div`
	position: relative;
	left: -${size / 2}px;
	top: 0;
	perspective: 400px;
`;
const QuestionMark = styled.div`
	position: absolute;
	font-size: ${size}px;
	font-weight: 900;
	color: ${mainColor};
	text-align: center;
	line-height: 1;
	text-shadow: 5px 2px black;

	display: block;
	width: ${size}px;
	height: ${size}px;

	transform-style: preserve-3d;
	animation: rotationMark ${duration}s linear infinite;

	@keyframes rotationMark {
		from {
			transform: rotateY(0);
		}
		to {
			transform: rotateY(360deg);
		}
	}
`;
const CubeSide = styled.div`
	width: ${size}px;
	height: ${size}px;
	position: absolute;
	border: 5px solid black;
	transform-style: preserve-3d;
	transform-origin: ${size / 2}px ${size / 2}px -${size / 2}px;
	${(p) => getAnimationProperties(p)}
`;

const getAnimationProperties = ({ type }) => {
	switch (type) {
		case "front":
			return `transform: translateZ(${size / 2}px);
			animation: rotationSide-${type} ${duration}s linear infinite;
			@keyframes rotationSide-${type} {
				from { transform: translateZ(${size / 2}px) rotateY(0deg); }
				to { transform: translateZ(${size / 2}px) rotateY(360deg); }
			}`;
		case "back":
			return `transform: translateZ(${size / 2}px) rotateY(180deg);
			animation: rotationSide-${type} ${duration}s linear infinite;
				@keyframes rotationSide-${type} {
					from { transform: translateZ(${size / 2}px) rotateY(180deg); }
					to { transform: translateZ(${size / 2}px) rotateY(${180 + 360}deg); }
				}`;
		case "left":
			return `transform: translateZ(${size / 2}px) rotateY(-90deg);
			animation: rotationSide-${type} ${duration}s linear infinite;
				@keyframes rotationSide-${type} {
					from { transform: translateZ(${size / 2}px) rotateY(-90deg); }
					to { transform: translateZ(${size / 2}px) rotateY(${-90 + 360}deg); }
				}`;
		case "right":
			return `transform: translateZ(${size / 2}px) rotateY(90deg);
			animation: rotationSide-${type} ${duration}s linear infinite;
				@keyframes rotationSide-${type} {
					from { transform: translateZ(${size / 2}px) rotateY(90deg); }
					to { transform: translateZ(${size / 2}px) rotateY(${90 + 360}deg); }
				}`;
		case "top":
			return `transform: translateZ(${size / 2}px) rotateX(90deg);
			animation: rotationSide-${type} ${duration}s linear infinite;
				@keyframes rotationSide-${type} {
					from { transform: translateZ(${size / 2}px) rotateX(90deg) rotateZ(360deg); }
					to { transform: translateZ(${size / 2}px) rotateX(90deg) rotateZ(0); }
				}`;
		case "bottom":
			return `transform: translateZ(${size / 2}px) rotateX(-90deg);
			animation: rotationSide-${type} ${duration}s linear infinite;
				@keyframes rotationSide-${type} {
					from { transform: translateZ(${size / 2}px) rotateX(-90deg) rotateZ(0); }
					to { transform: translateZ(${size / 2}px) rotateX(-90deg) rotateZ(360deg); }
				}`;
	}
};

const Loading = () => (
	<Container>
		<LoadingStyled>
			<QuestionMark>?</QuestionMark>
			<CubeSide type="front" />
			<CubeSide type="back" />
			<CubeSide type="left" />
			<CubeSide type="right" />
			<CubeSide type="top" />
			<CubeSide type="bottom" />
		</LoadingStyled>
	</Container>
);

export default Loading;
