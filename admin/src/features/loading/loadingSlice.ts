import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    loading: false
}

const loadingSlice = createSlice({
    name:"loading slice",
    initialState,
    reducers:{
        setLoadingState: (state, action)=>{
            state.loading = action.payload
        }
    }
})


export const {setLoadingState} = loadingSlice.actions
export default loadingSlice.reducer