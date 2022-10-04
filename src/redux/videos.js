

// // export const getVideosByCategory = keyword => async (dispatch, getState) => {
// //     try {
// //         dispatch({
// //             type: HOME_VIDEOS_REQUEST,
// //         })
// //         const { data } = await request('/search', {
// //             params: {
// //                 part: 'snippet',

// //                 maxResults: 20,
// //                 pageToken: getState().homeVideos.nextPageToken,
// //                 q: keyword,
// //                 type: 'video',
// //             },
// //         })

// //         dispatch({
// //             type: HOME_VIDEOS_SUCCESS,
// //             payload: {
// //                 videos: data.items,
// //                 nextPageToken: data.nextPageToken,
// //                 category: keyword,
// //             },
// //         })
// //     } catch (error) {
// //         console.log(error.message)
// //         dispatch({
// //             type: HOME_VIDEOS_FAIL,
// //             payload: error.message,
// //         })
// //     }
// // }

// // export const getVideoById = id => async dispatch => {
// //     try {
// //         dispatch({
// //             type: SELECTED_VIDEO_REQUEST,
// //         })

// //         const { data } = await request('/videos', {
// //             params: {
// //                 part: 'snippet,statistics',
// //                 id: id,
// //             },
// //         })
// //         dispatch({
// //             type: SELECTED_VIDEO_SUCCESS,
// //             payload: data.items[0],
// //         })
// //     } catch (error) {
// //         console.log(error.message)
// //         dispatch({
// //             type: SELECTED_VIDEO_FAIL,
// //             payload: error.message,
// //         })
// //     }
// // }

// // export const getRelatedVideos = id => async dispatch => {
// //     try {
// //         dispatch({
// //             type: RELATED_VIDEO_REQUEST,
// //         })

// //         const { data } = await request('/search', {
// //             params: {
// //                 part: 'snippet',
// //                 relatedToVideoId: id,
// //                 maxResults: 15,
// //                 type: 'video',
// //             },
// //         })
// //         dispatch({
// //             type: RELATED_VIDEO_SUCCESS,
// //             payload: data.items,
// //         })
// //     } catch (error) {
// //         console.log(error.response.data.message)
// //         dispatch({
// //             type: RELATED_VIDEO_FAIL,
// //             payload: error.response.data.message,
// //         })
// //     }
// // }

// // export const getVideosBySearch = keyword => async dispatch => {
// //     try {
// //         dispatch({
// //             type: SEARCHED_VIDEO_REQUEST,
// //         })
// //         const { data } = await request('/search', {
// //             params: {
// //                 part: 'snippet',

// //                 maxResults: 20,
// //                 q: keyword,
// //                 type: 'video,channel',
// //             },
// //         })

// //         dispatch({
// //             type: SEARCHED_VIDEO_SUCCESS,
// //             payload: data.items,
// //         })
// //     } catch (error) {
// //         console.log(error.message)
// //         dispatch({
// //             type: SEARCHED_VIDEO_FAIL,
// //             payload: error.message,
// //         })
// //     }
// // }

// // export const getSubscribedChannels = () => async (dispatch, getState) => {
// //     try {
// //         dispatch({
// //             type: SUBSCRIPTIONS_CHANNEL_REQUEST,
// //         })
// //         const { data } = await request('/subscriptions', {
// //             params: {
// //                 part: 'snippet,contentDetails',

// //                 mine: true,
// //             },
// //             headers: {
// //                 Authorization: `Bearer ${getState().auth.accessToken}`,
// //             },
// //         })
// //         dispatch({
// //             type: SUBSCRIPTIONS_CHANNEL_SUCCESS,
// //             payload: data.items,
// //         })
// //     } catch (error) {
// //         console.log(error.response.data)
// //         dispatch({
// //             type: SUBSCRIPTIONS_CHANNEL_FAIL,
// //             payload: error.response.data,
// //         })
// //     }
// // }

// // export const getVideosByChannel = id => async dispatch => {
// //     try {
// //         dispatch({
// //             type: CHANNEL_VIDEOS_REQUEST,
// //         })

// //         // 1. get upload playlist id
// //         const {
// //             data: { items },
// //         } = await request('/channels', {
// //             params: {
// //                 part: 'contentDetails',
// //                 id: id,
// //             },
// //         })
// //         const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
// //         // 2. get the videos using the id
// //         const { data } = await request('/playlistItems', {
// //             params: {
// //                 part: 'snippet,contentDetails',
// //                 playlistId: uploadPlaylistId,
// //                 maxResults: 30,
// //             },
// //         })

// //         dispatch({
// //             type: CHANNEL_VIDEOS_SUCCESS,
// //             payload: data.items,
// //         })
// //     } catch (error) {
// //         console.log(error.response.data.message)
// //         dispatch({
// //             type: CHANNEL_DETAILS_FAIL,
// //             payload: error.response.data,
// //         })
// //     }
// // }

// export const selectedVideoReducer = (
//     state = {
//         loading: true,
//         video: null,
//     },
//     action
// ) => {
//     const { payload, type } = action

//     switch (type) {
//         case SELECTED_VIDEO_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }
//         case SELECTED_VIDEO_SUCCESS:
//             return {
//                 ...state,
//                 video: payload,
//                 loading: false,
//             }
//         case SELECTED_VIDEO_FAIL:
//             return {
//                 ...state,
//                 video: null,
//                 loading: false,
//                 error: payload,
//             }

//         default:
//             return state
//     }
// }

// export const relatedVideoReducer = (
//     state = {
//         loading: true,
//         videos: [],
//     },
//     action
// ) => {
//     const { payload, type } = action

//     switch (type) {
//         case RELATED_VIDEO_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }
//         case RELATED_VIDEO_SUCCESS:
//             return {
//                 ...state,
//                 videos: payload,
//                 loading: false,
//             }
//         case RELATED_VIDEO_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: payload,
//             }

//         default:
//             return state
//     }
// }

// export const searchedVideosReducer = (
//     state = {
//         loading: true,
//         videos: [],
//     },
//     action
// ) => {
//     const { payload, type } = action

//     switch (type) {
//         case SEARCHED_VIDEO_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }
//         case SEARCHED_VIDEO_SUCCESS:
//             return {
//                 ...state,
//                 videos: payload,
//                 loading: false,
//             }
//         case SEARCHED_VIDEO_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: payload,
//             }

//         default:
//             return state
//     }
// }

// export const subscriptionsChannelReducer = (
//     state = {
//         loading: true,
//         videos: [],
//     },
//     action
// ) => {
//     const { payload, type } = action

//     switch (type) {
//         case SUBSCRIPTIONS_CHANNEL_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }
//         case SUBSCRIPTIONS_CHANNEL_SUCCESS:
//             return {
//                 ...state,
//                 videos: payload,
//                 loading: false,
//             }
//         case SUBSCRIPTIONS_CHANNEL_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: payload,
//             }

//         default:
//             return state
//     }
// }

// export const channelVideosReducer = (
//     state = {
//         loading: true,
//         videos: [],
//     },
//     action
// ) => {
//     const { payload, type } = action

//     switch (type) {
//         case CHANNEL_VIDEOS_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//             }
//         case CHANNEL_VIDEOS_SUCCESS:
//             return {
//                 ...state,
//                 videos: payload,
//                 loading: false,
//             }
//         case CHANNEL_VIDEOS_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 error: payload,
//             }

//         default:
//             return state
//     }
// } 