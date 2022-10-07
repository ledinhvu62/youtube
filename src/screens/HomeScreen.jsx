import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'

import CategoriesBar from '../components/CategoriesBar'
import Video from '../components/Video'

import { getPopularVideos, getVideosByCategory } from '../redux/videos/homeVideosSlice'

const HomeScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPopularVideos())
    }, [dispatch])

    const { videos, activeCategory } = useSelector(state => state.homeVideos)

    const fetchData = () => {
        if (activeCategory === 'All') {
            // Bug
            dispatch(getPopularVideos())
        }
        else {
            dispatch(getVideosByCategory(activeCategory))
        }
    }

    return (
        <div className="container mx-auto">
            <CategoriesBar />
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
            >
                <div className="grid grid-cols-3 mt-[calc(10vh_-_8px)] lg:grid-cols-4">
                    {
                        videos.map((video, index) => (
                            // Fix bug
                            <Video video={video} key={video.id + index} />
                        ))
                    }
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default HomeScreen