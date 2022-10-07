import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import VideoHorizontal from '../components/VideoHorizontal'

import { getSubscribedChannels } from '../redux/videos/subscriptionsChannelSlice'

const SubscriptionsScreen = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribedChannels())
    }, [dispatch])

    const { videos } = useSelector(state => state.subscriptionsChannel)

    return (
        <div className="px-24 py-6">
            {
                videos?.map(video => (
                    <VideoHorizontal video={video} key={video.id} subScreen />
                ))
            }
        </div>
    )
}

export default SubscriptionsScreen