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
import type { AppDispatch,RootState } from "@/store/store";
import { setLoadingState } from "@/features/loading/loadingSlice";



export default function VerifyEmailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {loading} = useSelector(
    (state: RootState) => state.loading
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      {loading && <Loader />}
      <Card className="w-full max-w-md border-2 border-border shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">
                TA
              </span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            Check you mail for verification
          </CardTitle>
          
        </CardHeader>
        <CardContent>
          <div  className="space-y-4">
            

            <Button
              type="submit"
            onClick={()=>{
                    console.log("loading")
                    dispatch(setLoadingState(true))
                }}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground font-semibold"
            >
              Verify Email
            </Button>
          </div>

          <div className="mt-6 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                onClick={()=>{
                    console.log("loading")
                    dispatch(setLoadingState(true))
                }}
                disabled={loading}
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
