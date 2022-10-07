import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth/authSlice'
import homeVideosSlice from './videos/homeVideosSlice'
import selectedVideoSlice from './videos/selectedVideoSlice'
import channelDetailsSlice from './channel/channelDetailsSlice'
import commentListSlice from './comments/commentListSlice'
import relatedVideoSlice from './videos/relatedVideoSlice'
import searchedVideosSlice from './videos/searchedVideosSlice'
import keywordSearchSlice from './search/keywordSearchSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        homeVideos: homeVideosSlice,
        selectedVideo: selectedVideoSlice,
        channelDetails: channelDetailsSlice,
        commentList: commentListSlice,
        relatedVideo: relatedVideoSlice,
        searchedVideos: searchedVideosSlice,
        keywordSearch: keywordSearchSlice
    }
})