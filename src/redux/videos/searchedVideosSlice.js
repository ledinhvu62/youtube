import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from '../../api'

const initialState = {
    loading: true,
    videos: [],
    error: null
}

export const getVideosBySearch = createAsyncThunk(
    'searchedVideosSlice/getVideosBySearch',
    async (keyword) => {
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    q: keyword,
                    type: 'video,channel'
                }
            })
            return data.items
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
)

export const searchedVideosSlice = createSlice({
    name: 'searchedVideos',
    initialState,
    extraReducers: {
        [getVideosBySearch.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getVideosBySearch.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                videos: payload,
                loading: false
            }
            // Fix bug
            return state
        },
        [getVideosBySearch.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                error: payload
            }
        }
    }
})

export default searchedVideosSlice.reducer