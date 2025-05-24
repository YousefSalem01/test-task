import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../App";
import { SignInPage } from "../views/Basic/Auth/SigninPage";
import { OnboardingPage } from "../views/Pages/OnboardingPage";

function AppRoutes() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signin' element={<SignInPage />} />
				<Route path='/onboarding' element={<OnboardingPage />} />
			</Routes>
		</Router>
	);
}

export default AppRoutes;
