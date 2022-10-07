import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: ''
}

export const keywordSearchSlice = createSlice({
    name: 'keywordSearch',
    initialState,
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        },
        remove: (state) => {
            state.value = ''
        }
    }
})

export const { set, remove } = keywordSearchSlice.actions

export default keywordSearchSlice.reducer