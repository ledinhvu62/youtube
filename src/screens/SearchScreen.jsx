import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import VideoHorizontal from '../components/VideoHorizontal'

import { getVideosBySearch } from '../redux/videos/searchedVideosSlice'

const SearchScreen = () => {
    const keyword = useSelector(state => state.keywordSearch.value)
    const { videos } = useSelector(state => state.searchedVideos)
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams({}) // eslint-disable-line

    useEffect(() => {
        dispatch(getVideosBySearch(keyword))
        setSearchParams({ search_query: keyword })
    }, [dispatch, setSearchParams]) // eslint-disable-line

    return (
        <div className="p-16">
            {
                videos?.map(video => (
                    <VideoHorizontal
                        video={video}
                        key={video.id.videoId || video.id.channelId}
                        searchScreen
                    />
                ))
            }
        </div>
    )
}

export default SearchScreen