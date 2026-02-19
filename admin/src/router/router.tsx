import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App.tsx";
import Home from "@/pages/Home.tsx";
import SignInPage from "@/pages/Signin.tsx";
import SignUpPage from "@/pages/Signup.tsx";
import DashboardPage from "@/pages/DashBoard.tsx";
import ProfilePage from "@/pages/Profile.tsx";
import VerifyEmailPage from "@/pages/VerifyEmail.tsx";
import IsAuthRoute from "./isauthRoute.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index element={<Home></Home>}></Route>
      <Route path="/signin" element={<SignInPage></SignInPage>}></Route>
      <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      <Route element={<IsAuthRoute></IsAuthRoute>}>
        <Route
          path="/dashboard"
          element={<DashboardPage></DashboardPage>}
        ></Route>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
      </Route>
      <Route
        path="/verify-email"
        element={<VerifyEmailPage></VerifyEmailPage>}
      ></Route>
    </Route>,
  ),
);

export { router };
