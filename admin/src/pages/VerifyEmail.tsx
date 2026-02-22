import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/Loader";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { setLoadingState } from "@/features/loading/loadingSlice";
import { toast } from "react-toastify";
import { useVerifyRootAdminEmailMutation, useResendRootAdminEmailVerifyLinkMutation } from "@/features/auth/authApi";
import { useNavigate } from "react-router-dom";

export default function VerifyEmailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [verifyEmail, { isLoading: AccVerifyLoading }] = useVerifyRootAdminEmailMutation();
  const queryParams = new URLSearchParams(window.location.search);
  const verifyToken = queryParams.get("verifyToken");
  const [sendVerificationLInk,{isLoading: isResendLoading}] = useResendRootAdminEmailVerifyLinkMutation();

  const handelVerifyEmail = async () => {
    console.log(verifyToken)
    if (!verifyToken) {
      toast.error("No verify token is fouch chekc your mail");
    } else {
      try {
        const res = await verifyEmail({ verifyToken }).unwrap();
        toast.success("Account verification complete");
        navigate("/signin");
      } catch (error: any) {
        console.log(error)
        toast.error(error?.data?.message);
      }
     
    }
  };

  const handelResendVerifyEmailLInk = async () => {
    try {
      const res = await sendVerificationLInk(null).unwrap()
      console.log(res)
      toast.success("Verification mail Send successfully")
    } catch (error:any) {
      toast.error(error?.data?.message || "Resend link failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      {(AccVerifyLoading || isResendLoading) && <Loader />}
      <Card className="w-full max-w-md border-2 border-border shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                BB
              </span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            Check you mail for verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              type="submit"
              onClick={handelVerifyEmail}
              disabled={AccVerifyLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold"
            >
              Verify Email
            </Button>
          </div>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                onClick={handelResendVerifyEmailLInk}
                disabled={isResendLoading}
                className="text-primary hover:underline font-semibold"
              >
                Resend Code
              </button>
            </p>
            <p className="text-sm text-muted-foreground">
              <NavLink
                to="/signin"
                className="text-primary hover:underline font-semibold"
              >
                Back to Sign In
              </NavLink>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
