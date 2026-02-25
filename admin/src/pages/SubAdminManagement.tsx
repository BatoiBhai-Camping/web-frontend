import { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/dashboard/NavBar";
import { Footer } from "@/components/dashboard/Foother";
import {
  useGetSubAdminsQuery,
  useApproveSubAdminMutation,
  useRejectSubAdminMutation,
} from "@/features/root-admin/rootAdminApi";
import { Loader } from "@/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setSubAdmins } from "@/features/root-admin/rootAdminSlice";
import type { RootState } from "@/store/store";
import { toast } from "react-toastify";

export default function SubAdminsPage() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedSubAdmin, setSelectedSubAdmin] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useGetSubAdminsQuery();
  const [
    approveSubAdmin,
    { isLoading: approveAdminLoading, isSuccess: approveAdminsuccess },
  ] = useApproveSubAdminMutation();
  const [
    rejecteSubAdmin,
    { isLoading: rejectAdminLoading, isSuccess: rejectAdminsuccess },
  ] = useRejectSubAdminMutation();

  const { subAdmins } = useSelector((state: RootState) => state.rootAdmin);
  useEffect(() => {
    if (approveAdminsuccess || rejectAdminsuccess) {
      refetch();
    }
  }, [approveAdminsuccess, refetch, rejectAdminsuccess]);

  // Store API data in Redux when fetched
  useEffect(() => {
    if (data?.data) {
      dispatch(setSubAdmins(data.data));
    }
  }, [data, dispatch]);

  // approve sub admin
  const approveRejSubAdminHandler = async (id: string, forApprove: boolean) => {
    if (forApprove) {
      // make request for approve
      try {
        const res = await approveSubAdmin({ id: id }).unwrap();
        toast.success("Admin is approved successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Approve of subadmin fail");
      }
    } else {
      try {
        const res = await rejecteSubAdmin({ id: id }).unwrap();
        toast.success("Admin is rejected successfully");
      } catch (err: any) {
        toast.error(err?.data?.message || "Rejection of admin fail");
      }
    }
  };

  const filteredSubAdmins = subAdmins.filter((admin) => {
    const matchesSearch =
      admin.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === null || admin.roleStatus.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-primary/10 text-primary border-primary/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/30";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

  const selectedAdmin = selectedSubAdmin
    ? subAdmins.find((a) => a.id === selectedSubAdmin)
    : null;

  // Show error if fetch failed
  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 max-w-md mx-4">
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Error Fetching Data
            </h2>
            <p className="text-muted-foreground">
              Unable to load sub-admins. Please try again later.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {error && "data" in error
                ? JSON.stringify(error.data)
                : "Network error"}
            </p>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {(isLoading || approveAdminLoading || rejectAdminLoading) && (
        <Loader></Loader>
      )}
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Sub-Administrators
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - List */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <Card className="p-4 mb-4 border-border">
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-64 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-muted"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={
                      statusFilter === "approved" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setStatusFilter(
                        statusFilter === "approved" ? null : "approved",
                      )
                    }
                  >
                    Approved
                  </Button>
                  <Button
                    variant={statusFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setStatusFilter(
                        statusFilter === "pending" ? null : "pending",
                      )
                    }
                  >
                    Pending
                  </Button>
                  <Button
                    variant={
                      statusFilter === "rejected" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setStatusFilter(
                        statusFilter === "rejected" ? null : "rejected",
                      )
                    }
                  >
                    Rejected
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {filteredSubAdmins.length} sub-admins found
              </p>
            </Card>

            {/* Sub-Admins List */}
            <div className="space-y-3">
              {filteredSubAdmins.map((admin) => (
                <Card
                  key={admin.id}
                  className={`p-4 hover:shadow-md transition-all cursor-pointer border-l-4 ${
                    selectedSubAdmin === admin.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                  onClick={() => setSelectedSubAdmin(admin.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex-shrink-0 bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {admin.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">
                        {admin.fullName}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {admin.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(admin.roleStatus.toLowerCase())}`}
                      >
                        {admin.roleStatus.charAt(0).toUpperCase() +
                          admin.roleStatus.slice(1).toLowerCase()}
                      </span>
                      {selectedSubAdmin === admin.id && (
                        <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {filteredSubAdmins.length === 0 && (
                <Card className="p-8 text-center border-border">
                  <p className="text-muted-foreground">No sub-admins found</p>
                </Card>
              )}
            </div>
          </div>

          {/* Right Panel - Detail View */}
          {selectedAdmin ? (
            <Card className="p-6 border-border h-fit lg:sticky lg:top-20">
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-primary bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                  {selectedAdmin.fullName.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-1">
                  {selectedAdmin.fullName}
                </h2>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedAdmin.roleStatus.toLowerCase())}`}
                >
                  {selectedAdmin.roleStatus.charAt(0).toUpperCase() +
                    selectedAdmin.roleStatus.slice(1).toLowerCase()}
                </span>
              </div>

              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-semibold text-foreground break-all">
                    {selectedAdmin.email}
                  </p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">
                    Email Verified
                  </p>
                  <p className="font-semibold text-foreground">
                    {selectedAdmin.emailVerified
                      ? "✓ Verified"
                      : "✗ Not Verified"}
                  </p>
                </div>

                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <p className="font-semibold text-foreground">
                    {selectedAdmin.phone || "Not provided"}
                  </p>
                </div>

                {selectedAdmin.address.length > 0 && (
                  <>
                    <div className="pb-4 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-1">City</p>
                      <p className="font-semibold text-foreground">
                        {selectedAdmin.address[0].city}
                      </p>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-1">
                        District
                      </p>
                      <p className="font-semibold text-foreground">
                        {selectedAdmin.address[0].district}
                      </p>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-1">
                        State
                      </p>
                      <p className="font-semibold text-foreground">
                        {selectedAdmin.address[0].state}
                      </p>
                    </div>

                    <div className="pb-4 border-b border-border">
                      <p className="text-xs text-muted-foreground mb-1">
                        Country
                      </p>
                      <p className="font-semibold text-foreground">
                        {selectedAdmin.address[0].country}
                      </p>
                    </div>

                    <div className="pb-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        Pincode
                      </p>
                      <p className="font-semibold text-foreground">
                        {selectedAdmin.address[0].pin}
                      </p>
                    </div>
                  </>
                )}

                <div className="pt-2">
                  <p className="text-xs text-muted-foreground mb-1">
                    Member Since
                  </p>
                  <p className="font-semibold text-foreground">
                    {new Date(selectedAdmin.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Button
                  disabled={approveAdminLoading}
                  onClick={() =>
                    approveRejSubAdminHandler(
                      selectedAdmin.id,
                      !(selectedAdmin.roleStatus == "APPROVED") ? true : false,
                    )
                  }
                  className={`${selectedAdmin.roleStatus == "APPROVED" ? "bg-red-400 hover:bg-red-500" : null} w-full mt-4`}
                >
                  {selectedAdmin.roleStatus == "APPROVED"
                    ? "Reject admin"
                    : "Approved admin"}
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 border-border h-fit flex items-center justify-center lg:sticky lg:top-20 min-h-96">
              <p className="text-center text-muted-foreground">
                Select a sub-admin to view details
              </p>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
