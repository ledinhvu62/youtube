import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import VideoHorizontal from '../components/VideoHorizontal'

import { getVideosBySearch } from '../redux/videos/searchedVideosSlice'

const SearchScreen = () => {
    const { query } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideosBySearch(query))
    }, [query, dispatch])

    const { videos } = useSelector(state => state.searchedVideos)

    return (
        <div className="bg-[#0000000d]">
            {
                videos?.map(video => (
                    <VideoHorizontal
                        video={video}
                        key={video.id.videoId}
                        searchScreen
                    />
                ))
            }
        </div>
    )
}

export default SearchScreen