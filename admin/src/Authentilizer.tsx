import { useDispatch } from "react-redux";
import { useGetRootAdminProfileQuery } from "./features/auth/authApi";
import { setCredentials } from "./features/auth/authSlice";
import { useEffect } from "react";
import { Loader } from "./components/Loader";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");

  const { data, isLoading } = useGetRootAdminProfileQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials(data.data));
    }
  }, [data, dispatch]);

  if (isLoading) return <Loader />;

  return <>{children}</>;
}

export default AuthInitializer;