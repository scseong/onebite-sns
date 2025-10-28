import { Navigate, Route, Routes } from "react-router";
import {
  ForgetPasswordPage,
  IndexPage,
  PostDetailPage,
  ProfileDetailPage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
} from "./pages";

export default function RootRoute() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forget-password" element={<ForgetPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route path="/post/:postId" element={<PostDetailPage />} />
      <Route path="/profile/:userId" element={<ProfileDetailPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
