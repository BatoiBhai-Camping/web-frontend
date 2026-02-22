import { Footer } from "@/components/dashboard/Foother";
import { Navbar } from "@/components/dashboard/NavBar";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { AppDispatch, RootState } from "@/store/store";
import { ArrowLeft, Calendar, Mail, MapPin, Phone, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { userType } from "../types/userType";

export default function ProfilePage() {
 

  const user: userType = useSelector((state: RootState) => state.auth.user);
  

  // Call the hook at the top level of the component
 

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* {isLoading && <Loader></Loader>} */}
      <Navbar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-6 max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="mb-6">
            <NavLink
              to="/dashboard"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </NavLink>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Profile
            </h1>
          </div>

          {/* Profile Card */}
          <Card className="border-2 border-border mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Profile Information</CardTitle>
              <CardDescription>View your admin account details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Profile Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  {user?.profileImage ? (
                    <img
                      src={user?.profileImage || ""}
                      className="text-primary-foreground font-bold text-2xl"
                    />
                  ) : (
                    <span className="text-primary-foreground font-bold text-2xl">
                      {user?.fullName[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {user?.fullName || ""}
                  </h2>
                  <Badge className="bg-primary text-primary-foreground mt-1">
                    {user?.role || ""}
                  </Badge>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground">
                        {user?.fullName || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground">
                        {user?.email || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground">
                        {user?.phone || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Account Created
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground">
                        {user?.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Role
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground">
                        {user?.role || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Role Status
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground">
                        {user?.roleStatus || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email Verified
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Badge
                        className={
                          user?.emailVerified
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {user?.emailVerified ? "Verified" : "Not Verified"}
                      </Badge>
                    </div>
                  </div>

                  {/* <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      User ID
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground text-xs">
                        {user?.id || "N/A"}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Address Information */}

              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Address Information
              </h3>
              {user?.address && user.address.length > 0 ? (
                <div className="space-y-4">
                  {user.address.map((addr) => (
                    <Card key={addr.id} className="border border-border">
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                              Address Type
                            </label>
                            <p className="text-foreground">
                              {addr.addressType || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                              City
                            </label>
                            <p className="text-foreground">
                              {addr.city || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                              District
                            </label>
                            <p className="text-foreground">
                              {addr.district || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                              State
                            </label>
                            <p className="text-foreground">
                              {addr.state || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                              Country
                            </label>
                            <p className="text-foreground">
                              {addr.country || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                              PIN Code
                            </label>
                            <p className="text-foreground">
                              {addr.pin || "N/A"}
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">
                              Coordinates
                            </label>
                            <p className="text-foreground text-sm">
                              {addr.latitude && addr.longitude
                                ? `${addr.latitude}, ${addr.longitude}`
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-muted rounded text-center">
                  <p className="text-muted-foreground">
                    No address information available
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="border-border bg-transparent"
              >
                Change Password
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Last password change: 30 days ago
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
