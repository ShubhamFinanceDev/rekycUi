import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loader: false,
    purpose: ""
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        startLoaderAct: (state, action) => {
            if (!state.loader) {
                state.loader = true

                if (action?.payload != undefined) {
                    state.purpose = action.payload
                }

            }
        },
        stopLoaderAct: (state) => {
            state.loader = false
            state.purpose = ""
        },
    },
})

export const { startLoaderAct, stopLoaderAct } = loaderSlice.actions
export default loaderSlice.reducer