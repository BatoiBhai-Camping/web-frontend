import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: "",
    fullName: "",
    email: "",
    emailVerified: true,
    role: "",
    roleStatus: "",
    phone: "",
    createdAt: "",
    profileImage: null,
    address: [],
  },
  isAuthenticated: false,
  hasUserData: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.hasUserData = true;
    },
    logout: (state) => {
      state.user = {
        id: "",
        fullName: "",
        email: "",
        emailVerified: true,
        role: "",
        roleStatus: "",
        phone: "",
        createdAt: "",
        profileImage: null,
        address: [],
      };
      state.isAuthenticated = false;
      state.hasUserData = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
