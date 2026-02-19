import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetRootAdminProfileQuery } from "@/features/auth/authApi";
import { setCredentials } from "@/features/auth/authSlice";
import { Loader } from "@/components/Loader";
import type { RootState, AppDispatch } from "@/store/store";

const IsAuthRoute = (): any => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const hasUserData: boolean = useSelector(
    (state: RootState) => state.auth.hasUserData as boolean,
  );

  const [isValidating, setIsValidating] = useState(true);

  // Try to fetch user profile to validate authentication
  const { data, isLoading, isError, isSuccess } = useGetRootAdminProfileQuery(
    undefined,
    {
      skip: hasUserData && isAuthenticated, // Skip if already authenticated
    },
  );

  useEffect(() => {
    // If already authenticated, no need to validate
    if (isAuthenticated && hasUserData) {
      setIsValidating(false);
      return;
    }

    // If profile fetch is successful, set credentials
    if (isSuccess && data) {
      dispatch(setCredentials(data.data));
      setIsValidating(false);
    }

    // If profile fetch failed, stop validating
    if (isError) {
      setIsValidating(false);
    }

    // If not loading and not authenticated, stop validating
    if (!isLoading && !isAuthenticated) {
      setIsValidating(false);
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    isAuthenticated,
    hasUserData,
    data,
    dispatch,
  ]);

  // Show loader while validating authentication
  if (isValidating || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  // Redirect to home if not authenticated after validation
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Render protected routes if authenticated
  return <Outlet />;
};

export default IsAuthRoute;
