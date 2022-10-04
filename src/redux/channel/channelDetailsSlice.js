import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from '../../api'

const initialState = {
    loading: true,
    channel: {},
    subscriptionStatus: false,
    error: null
}

export const getChannelDetails = createAsyncThunk(
    'channelDetailsSlice/getChannelDetails',
    async (id) => {
        try {
            const { data } = await request('/channels', {
                params: {
                    part: 'snippet,statistics,contentDetails',
                    id
                }
            })
            return data.items[0]
        } catch (error) {
            console.log(error.response.data)
            return error.response.data
        }
    }
)

export const checkSubscriptionStatus = createAsyncThunk(
    'channelDetailsSlice/checkSubscriptionStatus',
    async (id, thunkAPI) => {
        try {
            const state = thunkAPI.getState()
            const accessToken = state.auth.accessToken
            const { data } = await request('/subscriptions', {
                params: {
                    part: 'snippet',
                    forChannelId: id,
                    mine: true
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return data.items.length !== 0
        } catch (error) {
            console.log(error.response.data)
            return error.response.data
        }
    }
)

export const channelDetailsSlice = createSlice({
    name: 'channelDetails',
    initialState,
    extraReducers: {
        [getChannelDetails.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getChannelDetails.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                channel: payload,
                loading: false
            }
            // Fix bug
            return state
        },
        [getChannelDetails.rejected]: (state, { payload }) => {
            state = {
                ...state,
                channel: {},
                loading: false,
                error: payload
            }
        },
        [checkSubscriptionStatus.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [checkSubscriptionStatus.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                subscriptionStatus: payload,
                loading: false
            }
            // Fix bug
            return state
        },
        [checkSubscriptionStatus.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                subscriptionStatus: false,
                error: payload
            }
        }
    }
})

export default channelDetailsSlice.reducer