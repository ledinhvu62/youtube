import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import VideoMetaData from '../components/VideoMetaData'
import Comments from '../components/Comments'
import VideoHorizontal from '../components/VideoHorizontal'

import { getVideoById } from '../redux/videos/selectedVideoSlice'
import { getRelatedVideos } from '../redux/videos/relatedVideoSlice'

const WatchScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { video } = useSelector(state => state.selectedVideo)
    const { videos } = useSelector(state => state.relatedVideo)

    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getRelatedVideos(id))
    }, [dispatch, id])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [video])

    return (
        <div className="grid grid-cols-3 gap-6 bg-[#0000000d]">
            <div className="col-span-2">
                <div className="h-[60vh] w-full mb-8">
                    <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        frameBorder="0"
                        title={video?.snippet?.title}
                        allowFullScreen
                        width="100%"
                        height="100%"
                    >
                    </iframe>
                </div>
                <VideoMetaData
                    video={video}
                    videoId={id}
                />
                <Comments
                    videoId={id}
                    totalComments={video?.statistics?.commentCount}
                />
            </div>
            <div>
                {
                    videos
                        ?.filter(video => video.snippet)
                        .map(video => (
                            <VideoHorizontal video={video} key={video.id.videoId} />
                        ))
                }
            </div>
        </div>
    )
}

export default WatchScreen