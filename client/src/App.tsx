import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import Registre from "./pages/Registre.tsx";
import SignIn from "./pages/SignIn.tsx";
import "./App.css";
import JobSeekerDashboard from "./dashboards/Job seekers/Dashboard.tsx";
import EmployerDashboard from "./dashboards/Employer/Dashboard.tsx";
import JobSearchLanding from "./pages/jobSearch.tsx";
import { useDispatch, useSelector } from "react-redux";
import JobOffer from "./pages/JobOffer.tsx";
import CompanyProfile from "./pages/CompanyProfile.tsx";
import { useEffect } from "react";
import { signout } from "./redux/user/userSlice.ts";
import AuthProtection from "./components/utils/AuthProtection.tsx";

const App = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/auth/me/${currentUser?.userId}`,
        );
        if (!res.ok) {
          console.error("Failed to fetch user data");
          dispatch(signout());
        }
      } catch (error) {
        dispatch(signout());
        console.error("Error fetching user data:");
      }
    };

    const handleLogOut = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
        if (!res.ok) {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Logout failed", error);
      }
    };
    if (currentUser) {
      checkAuth();
    } else {
      handleLogOut();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route
          element={
            <AuthProtection requireAuth={false}>
              <Registre />
            </AuthProtection>
          }
          path="/Registre"
        />
        <Route
          element={
            <AuthProtection requireAuth={false}>
              <SignIn />
            </AuthProtection>
          }
          path="/SignIn"
        />
        <Route
          element={
            currentUser?.role === "employer" ? (
              <AuthProtection requireAuth={true}>
                <EmployerDashboard />
              </AuthProtection>
            ) : (
              <AuthProtection requireAuth={true}>
                <JobSeekerDashboard />
              </AuthProtection>
            )
          }
          path="/dashboard"
        />
        <Route element={<JobSearchLanding />} path="/jobSearchLanding" />
        <Route element={<JobOffer />} path="/joboffer/:id" />
        <Route element={<CompanyProfile />} path="/company/:id" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
