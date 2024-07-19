import {
  LucideCheckCircle,
  LucideCircleX,
  LucideInfo,
  LucideLoader2,
  LucideOctagonX,
} from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Logout from "./components/Logout";
import MyAttemptsPage from "./components/MyAttemptsPage";
import MyPage from "./components/MyPage";
import Navbar from "./components/Navbar";
import { Page404 } from "./components/Page404";
import ProtectedRoute from "./components/ProtectedRoute";
import QuizAttemptPage from "./components/QuizAttemptPage";
import QuizEditPage from "./components/QuizEditPage";
import QuizPlayPage from "./components/QuizPlayPage";
import RegisterAccount from "./components/RegisterAccount";
import TipsPage from "./components/TipsPage";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logg-inn" element={<Login />} />
            <Route path="/registrer-bruker" element={<RegisterAccount />} />
            <Route
              path="/logg-ut"
              element={
                <ProtectedRoute>
                  <Logout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/min-side"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:quizId/rediger"
              element={
                <ProtectedRoute>
                  <QuizEditPage />
                </ProtectedRoute>
              }
            />
            <Route path="/quiz/:quizLink/spill" element={<QuizPlayPage />} />
            <Route
              path="/quiz/forsok/:quizAttemptLink"
              element={<QuizAttemptPage />}
            />
            <Route
              path="/mine-forsok"
              element={
                <ProtectedRoute>
                  <MyAttemptsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="abc" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthProvider>
      <Toaster
        icons={{
          success: <LucideCheckCircle size={36} />,
          info: <LucideInfo size={36} />,
          warning: <LucideOctagonX size={36} />,
          error: <LucideCircleX size={36} />,
          loading: <LucideLoader2 size={36} />,
        }}
        richColors
        position="bottom-center"
      />
    </>
  );
}

export default App;
