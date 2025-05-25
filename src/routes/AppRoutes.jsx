import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "../App";
import { SignInPage } from "../views/Basic/Auth/SigninPage";
import { OnboardingPage } from "../views/Pages/OnboardingPage";
import ZustandDemo from "../views/ZustandDemo";
import { ToastExample } from "../components/ToastExample/ToastExample";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/zustand-demo" element={<ZustandDemo />} />
        <Route path="/toast-example" element={<ToastExample />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
