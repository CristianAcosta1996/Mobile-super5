import { Navigate, Route, Routes } from "react-router-dom";
//import { LoginPage } from "../pages/LoginPage";
//import { SignUpPage } from "../pages/SignUpPage";
/*
     <Route path="signup" element={<SignUpPage />} />
      <Route path="login" element={<LoginPage />} />
*/
export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};