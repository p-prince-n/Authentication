import FloatingShap from "./components/FloatingShap";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignInPage from "./Pages/SignInPage";
import SignUpPage from "./Pages/SignUpPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./Store/authStore";
import { useEffect } from "react";
import DashBoard from "./components/DashboardPage";
import LoadingSpinner from "./Pages/LoadingSpinner";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated ) {
    return <Navigate to={"/sign-in"} replace />;
  }
  if (!user.isVerified) {
    return <Navigate to={"/verify-email"} replace />;
  }
  return children;
};

const RedirectHomePage = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && (user && user.isVerified)) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};
function App() {
  const {  isCheckingAuth, checkAuth } =
    useAuthStore();

  useEffect(() => {
   
    checkAuth();
  }, [checkAuth]);
  if(isCheckingAuth) return <LoadingSpinner/>
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden ">
      <FloatingShap
        color="bg-green-500"
        size="size-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShap
        color="bg-green-500"
        size="size-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShap
        color="bg-green-500"
        size="size-32"
        top="40%"
        left="-5%"
        delay={2}
      />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute>
              <DashBoard />
            </ProtectRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <RedirectHomePage>
              <SignUpPage />
            </RedirectHomePage>
          }
        />
        <Route
          path="/sign-in"
          element={
            <RedirectHomePage>
              <SignInPage />
            </RedirectHomePage>
          }
        />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectHomePage>
              <ForgotPasswordPage />
            </RedirectHomePage>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectHomePage>
              <ResetPasswordPage />
            </RedirectHomePage>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
