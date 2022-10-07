import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from '../../api'

const initialState = {
    loading: true,
    videos: [],
    error: null
}

export const getSubscribedChannels = createAsyncThunk(
    'subscriptionsChannelSlice/getSubscribedChannels',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState()
            const accessToken = state.auth.accessToken
            const { data } = await request('/subscriptions', {
                params: {
                    part: 'snippet,contentDetails',
                    mine: true
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return data.items
        } catch (error) {
            console.log(error.response.data)
            return error.response.data
        }
    }
)

export const subscriptionsChannelSlice = createSlice({
    name: 'subscriptionsChannel',
    initialState,
    extraReducers: {
        [getSubscribedChannels.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getSubscribedChannels.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                videos: payload,
                loading: false
            }
            // Fix bug
            return state
        },
        [getSubscribedChannels.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                error: payload
            }
        }
    }
})

export default subscriptionsChannelSlice.reducer