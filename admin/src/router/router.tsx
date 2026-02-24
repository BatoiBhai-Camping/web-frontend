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
import IsRoleApproved from "./isRoleApproved.tsx";
import RootAdminSignUpPage from "@/pages/RootAdminRegister.tsx";
import SubAdminsPage from "@/pages/SubAdminManagement.tsx";
import UserDetailPage from "@/pages/UserPage.tsx";
import PackageDetailPage from "@/pages/PackagesPage.tsx";
import AgentDetailPage from "@/pages/AgentPage.tsx";
import BookingDetailPage from "@/pages/BokkingPage.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index element={<Home></Home>}></Route>
      <Route path="/signin" element={<SignInPage></SignInPage>}></Route>
      <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
      <Route
        path="/root-admin-signup"
        element={<RootAdminSignUpPage></RootAdminSignUpPage>}
      ></Route>
      <Route element={<IsRoleApproved></IsRoleApproved>}>
        <Route
          path="/dashboard"
          element={<DashboardPage></DashboardPage>}
        ></Route>
        <Route
          path="/dashboard/users/:id"
          element={<UserDetailPage></UserDetailPage>}
        ></Route>
        <Route
          path="/dashboard/agents/:id"
          element={<AgentDetailPage></AgentDetailPage>}
        ></Route>
        <Route
          path="/dashboard/bookings/:id"
          element={<BookingDetailPage></BookingDetailPage>}
        ></Route>
        <Route
          path="/dashboard/packages/:id"
          element={<PackageDetailPage></PackageDetailPage>}
        ></Route>
      </Route>
      <Route element={<IsAuthRoute></IsAuthRoute>}>
        <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
      </Route>
      <Route
        path="/verify-email"
        element={<VerifyEmailPage></VerifyEmailPage>}
      ></Route>
      <Route
        path="/sub-admins"
        element={<SubAdminsPage></SubAdminsPage>}
      ></Route>
    </Route>,
  ),
);

export { router };
