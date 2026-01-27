import React from "react";

import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/dashboard/NavBar";
import { Footer } from "@/components/dashboard/Foother";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit2,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const router = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "admin@travel.com",
    phone: "+1-555-0001",
    location: "New York, USA",
    joinDate: "2023-06-15",
    role: "Super Admin",
    department: "Management",
  });

  const [editData, setEditData] = useState(profileData);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router("/signin");
    }
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Profile Information</CardTitle>
                <CardDescription>
                  Manage your admin account details
                </CardDescription>
              </div>
              {!isEditing && (
                <Button
                  onClick={handleEdit}
                  className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Profile Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-2xl">
                    JD
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {profileData.name}
                  </h2>
                  <Badge className="bg-primary text-primary-foreground mt-1">
                    {profileData.role}
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
                    {isEditing ? (
                      <Input
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="text-foreground">
                          {profileData.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <Input
                        name="email"
                        type="email"
                        value={editData.email}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="text-foreground">
                          {profileData.email}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="text-foreground">
                          {profileData.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    {isEditing ? (
                      <Input
                        name="location"
                        value={editData.location}
                        onChange={handleInputChange}
                        className="border-border"
                      />
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-muted rounded">
                        <span className="text-foreground">
                          {profileData.location}
                        </span>
                      </div>
                    )}
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
                        {profileData.role}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Department
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground">
                        {profileData.department}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Join Date
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <span className="text-foreground">
                        {profileData.joinDate}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Status
                    </label>
                    <div className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Badge className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="border-t border-border pt-6 flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="gap-2 border-border"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
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
