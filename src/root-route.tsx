import { Navigate, Route, Routes } from "react-router";
import {
  ForgetPasswordPage,
  IndexPage,
  PostDetailPage,
  ProfileDetailPage,
  ResetPasswordPage,
  SignInPage,
  SignUpPage,
} from "@/pages";
import {
  GlobalLayout,
  GuestOnlyLayout,
  MemberOnlyLayout,
} from "@/components/layout";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<GuestOnlyLayout />}>
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route element={<MemberOnlyLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route path="/profile/:userId" element={<ProfileDetailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
