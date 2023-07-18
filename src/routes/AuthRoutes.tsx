import { Navigate, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../auth/screens/LoginScreen";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginScreen />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  );
};
