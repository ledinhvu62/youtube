import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from '../../api'

const initialState = {
    loading: true,
    // Fix bug
    video: {
        snippet: '',
        statistics: ''
    },
    error: null
}

export const getVideoById = createAsyncThunk(
    'selectedVideoSlice/getVideoById',
    async (id) => {
        try {
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,statistics',
                    id
                }
            })
            return data.items[0]
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
)

export const selectedVideoSlice = createSlice({
    name: 'selectedVideo',
    initialState,
    extraReducers: {
        [getVideoById.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getVideoById.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                video: payload,
                loading: false
            }
            // Fix bug
            return state
        },
        [getVideoById.rejected]: (state, { payload }) => {
            state = {
                ...state,
                video: {
                    snippet: '',
                    statistics: ''
                },
                loading: false,
                error: payload
            }
        }
    }
})

export default selectedVideoSlice.reducer