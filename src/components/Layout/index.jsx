import { NavLink, Outlet } from "react-router-dom";
import { AppComponent, Footer, Header, Main, MainContent, Navigation, NavigationItem } from "./styledComponents";

const setActive = ({ isActive }) => (isActive ? "active" : undefined);

const Layout = () => {
	return (
		<AppComponent>
			<Header>
				<Navigation>
					<NavigationItem>
						<NavLink className={setActive} to="/quizzes">
							Quiz list
						</NavLink>
					</NavigationItem>
					<NavigationItem>
						<NavLink className={setActive} to="/create-quiz">
							Create quiz
						</NavLink>
					</NavigationItem>
				</Navigation>
			</Header>

			<Main>
				<MainContent>
					<Outlet />
				</MainContent>
			</Main>

			<Footer>footer content</Footer>
		</AppComponent>
	);
};

export default Layout;
