
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Menu, User, LogOut, Settings, Loader } from "lucide-react";
import { useState } from "react";
import type { RootState } from "@/store/store";
import type { userType } from "@/types/userType";
import { useDispatch, useSelector } from "react-redux";
import {useLogoutMutation} from "../../features/auth/authApi"
import { toast } from "react-toastify";
import {setLoadingState} from "../../features/loading/loadingSlice"
import {logout} from "../../features/auth/authSlice"
import type{ AppDispatch } from "@/store/store";


interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const user: userType = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
 
 const [logoutUser,{}] = useLogoutMutation();
 const dispatch = useDispatch<AppDispatch>();
const handelLogout = async () => {
  try {
    const res = await logoutUser()
    toast.success("Logout successfull");
    dispatch(logout())
    dispatch(setLoadingState(true))
    navigate("/signin")
  } catch (err:any) {
    toast.error(err?.data?.message || "Logout failed")
  }finally{
    dispatch(setLoadingState(false))
  }
}
  return (
    <nav className="bg-sidebar border-b border-sidebar-border shadow-md h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg transition"
        >
          <Menu className="w-6 h-6 text-sidebar-foreground" />
        </button>
        <NavLink
          to="/dashboard"
          className="flex items-center gap-2 text-sidebar-foreground font-bold text-xl"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">BB</span>
          </div>
          <span className="hidden sm:inline">BatoiBhai</span>
        </NavLink>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* <button className="p-2 hover:bg-sidebar-accent rounded-lg transition relative">
          <Bell className="w-5 h-5 text-sidebar-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button> */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-sidebar-accent rounded-lg transition">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="hidden md:inline text-sm font-medium text-sidebar-foreground">
                {user.fullName || ""}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 border-b border-border">
              <p className="font-semibold text-foreground">{user.fullName || ""}</p>
              <p className="text-sm text-muted-foreground">{user.email || ""}</p>
            </div>
            <DropdownMenuItem asChild>
              <NavLink
                to="/profile"
                className="flex items-center gap-2 cursor-pointer"
              >
                <User className="w-4 h-4" />
                Profile
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Settings className="w-4 h-4" />
              Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handelLogout}
              className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
