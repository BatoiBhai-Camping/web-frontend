import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { userType } from "@/types/userType";

interface rootAdminState {
  subAdmins: userType[];
}

const initialState: rootAdminState = {
  subAdmins: [],
};

const rootAdminSlice = createSlice({
  name: "subAdmin",
  initialState,
  reducers: {
    setSubAdmins: (state, action: PayloadAction<userType[]>) => {
      state.subAdmins = action.payload;
    },
  },
});

export const { setSubAdmins } = rootAdminSlice.actions;

export default rootAdminSlice.reducer;
