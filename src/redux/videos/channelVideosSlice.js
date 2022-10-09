import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from '../../api'

const initialState = {
    loading: true,
    videos: [],
    error: null
}

export const getVideosByChannel = createAsyncThunk(
    'channelVideosSlice/getVideosByChannel',
    async (id) => {
        try {
            const {
                data: { items }
            } = await request('/channels', {
                params: {
                    part: 'contentDetails',
                    id
                }
            })

            const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads

            const { data } = await request('/playlistItems', {
                params: {
                    part: 'snippet,contentDetails',
                    playlistId: uploadPlaylistId,
                    maxResults: 30
                }
            })
            return data.items
        } catch (error) {
            console.log(error.response.data.message)
            return error.response.data.message
        }
    }
)

export const channelVideosSlice = createSlice({
    name: 'channelVideos',
    initialState,
    extraReducers: {
        [getVideosByChannel.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getVideosByChannel.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                videos: payload,
                loading: false
            }
            // Fix bug
            return state
        },
        [getVideosByChannel.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                error: payload
            }
        }
    }
})

export default channelVideosSlice.reducer