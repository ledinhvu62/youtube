import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from '../../api'

const initialState = {
    loading: true,
    videos: [],
    error: null
}

export const getRelatedVideos = createAsyncThunk(
    'relatedVideoSlice/getRelatedVideos',
    async (id) => {
        try {
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    relatedToVideoId: id,
                    maxResults: 50,
                    type: 'video'
                }
            })
            return data.items
        } catch (error) {
            console.log(error.response.data.message)
            return error.response.data.message
        }
    }
)

export const relatedVideoSlice = createSlice({
    name: 'relatedVideo',
    initialState,
    extraReducers: {
        [getRelatedVideos.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getRelatedVideos.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                videos: payload,
                loading: false
            }
            // Fix bug
            return state
        },
        [getRelatedVideos.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                error: payload
            }
        }
    }
})

export default relatedVideoSlice.reducer