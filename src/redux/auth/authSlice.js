import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import firebase from 'firebase/compat/app';
import auth from '../../firebase'

const initialState = {
    accessToken: sessionStorage.getItem('youtube-access-token')
        ? sessionStorage.getItem('youtube-access-token')
        : null,
    user: sessionStorage.getItem('youtube-user')
        ? JSON.parse(sessionStorage.getItem('youtube-user'))
        : null,
    loading: false,
    error: null
}

export const login = createAsyncThunk(
    'authSlice/login',
    async () => {
        try {
            const provider = new firebase.auth.GoogleAuthProvider()
            provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl')

            const res = await auth.signInWithPopup(provider)
            const accessToken = res.credential.accessToken
            const profile = {
                name: res.additionalUserInfo.profile.name,
                photoURL: res.additionalUserInfo.profile.picture
            }

            sessionStorage.setItem('youtube-access-token', accessToken)
            sessionStorage.setItem('youtube-user', JSON.stringify(profile))

            return { accessToken, profile }
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
)

export const logout = createAsyncThunk(
    'authSlice/logout',
    async () => {
        try {
            await auth.signOut()
            sessionStorage.removeItem('youtube-access-token')
            sessionStorage.removeItem('youtube-user')
            return null
        } catch (error) {
            console.log(error.message)
            return error.message
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [login.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [login.fulfilled]: (state, { payload }) => {
            state = {
                ...state,
                accessToken: payload.accessToken,
                user: payload.profile,
                loading: false
            }
            // Fix bug
            return state
        },
        [login.rejected]: (state, { payload }) => {
            state = {
                ...state,
                accessToken: null,
                loading: false,
                error: payload
            }
        },
        [logout.pending]: (state) => {
            state = {
                ...state,
                loading: true
            }
        },
        [logout.fulfilled]: (state) => {
            state = {
                ...state,
                accessToken: null,
                user: null,
                loading: false
            }
            // Fix bug
            return state
        },
        [logout.rejected]: (state, { payload }) => {
            state = {
                ...state,
                loading: false,
                error: payload
            }
        }
    }
})

export default authSlice.reducer