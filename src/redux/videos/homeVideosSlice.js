import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from '../../api'

const initialState = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: 'All',
    error: null
}

export const getPopularVideos = createAsyncThunk(
    'homeVideosSlice/getPopularVideos',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState()
            const nextPageToken = state.homeVideos.nextPageToken
            const { data } = await request('/videos', {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    chart: 'mostPopular',
                    regionCode: 'VN',
                    maxResults: 20,
                    pageToken: nextPageToken
                }
            })
            return {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: 'All'
            }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
)

export const getVideosByCategory = createAsyncThunk(
    'homeVideosSlice/getVideosByCategory',
    async (keyword, thunkAPI) => {
        try {
            const state = thunkAPI.getState()
            const nextPageToken = state.homeVideos.nextPageToken
            const { data } = await request('/search', {
                params: {
                    part: 'snippet',
                    maxResults: 20,
                    pageToken: nextPageToken,
                    q: keyword,
                    type: 'video'
                }
            })
            return {
                videos: data.items,
                nextPageToken: data.nextPageToken,
                category: keyword
            }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
)

export const homeVideosSlice = createSlice({
    name: 'homeVideos',
    initialState,
    extraReducers: {
        [getPopularVideos.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getPopularVideos.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                videos:
                    state.activeCategory === payload.category
                        ? [...state.videos, ...payload.videos]
                        : payload.videos,
                loading: false,
                nextPageToken: payload.nextPageToken,
                activeCategory: payload.category
            }
            // Fix bug
            return state
        },
        [getPopularVideos.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                error: payload
            }
        },

        // Duplicate code
        [getVideosByCategory.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getVideosByCategory.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                videos:
                    state.activeCategory === payload.category
                        ? [...state.videos, ...payload.videos]
                        : payload.videos,
                loading: false,
                nextPageToken: payload.nextPageToken,
                activeCategory: payload.category
            }
            // Fix bug
            return state
        },
        [getVideosByCategory.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                error: payload
            }
        }
    }
})

export default homeVideosSlice.reducer