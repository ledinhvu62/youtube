import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import request from '../../api'

const initialState = {
    loading: true,
    comments: null,
    error: null
}

export const getCommentsOfVideoById = createAsyncThunk(
    'commentListSlice/getCommentsOfVideoById',
    async (id) => {
        try {
            const { data } = await request('/commentThreads', {
                params: {
                    part: 'snippet',
                    videoId: id
                }
            })
            return data.items
        } catch (error) {
            console.log(error.response.data)
            return error.response.data
        }
    }
)

export const addComment = createAsyncThunk(
    'commentListSlice/addComment',
    async ({ videoId, text }, thunkAPI) => {
        try {
            const state = thunkAPI.getState()
            const accessToken = state.auth.accessToken

            const obj = {
                snippet: {
                    videoId,
                    topLevelComment: {
                        snippet: {
                            textOriginal: text
                        }
                    }
                }
            }

            await request.post('/commentThreads', obj, {
                params: {
                    part: 'snippet'
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return null
        } catch (error) {
            console.log(error.response.data)
            return error.response.data
        }
    }
)

export const commentListSlice = createSlice({
    name: 'commentList',
    initialState,
    extraReducers: {
        [getCommentsOfVideoById.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [getCommentsOfVideoById.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                comments: payload,
                loading: false
            }
            // Fix bug
            return state
        },
        [getCommentsOfVideoById.rejected]: (state, { payload }) => {
            state = {
                ...state,
                comments: null,
                loading: false,
                error: payload
            }
        },
        [addComment.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [addComment.fulfilled]: (state) => {
            state = {
                ...state,
                loading: false
            }
            // Fix bug
            return state
        },
        [addComment.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                error: payload
            }
        }
    }
})

export default commentListSlice.reducer