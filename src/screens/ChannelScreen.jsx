import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import numeral from 'numeral'

import { getVideosByChannel } from '../redux/videos/channelVideosSlice'
import { checkSubscriptionStatus, getChannelDetails } from '../redux/channel/channelDetailsSlice'

import Video from '../components/Video'

const ChannelScreen = () => {
    const { channelId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideosByChannel(channelId))
        dispatch(getChannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId])

    const { videos } = useSelector(state => state.channelVideos)
    const { channel: { snippet, statistics }, subscriptionStatus } = useSelector(state => state.channelDetails)

    return (
        <div className="px-16 py-2">
            <div className="px-5 my-2 flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src={snippet?.thumbnails?.default?.url}
                        alt=""
                        className="w-20 h-20 rounded-full"
                    />
                    <div className="ml-3">
                        <h3 className="text-2xl">{snippet?.title}</h3>
                        <span className="text-sm text-textColor">{numeral(statistics?.subscriberCount).format('0.a')} subscribers</span>
                    </div>
                </div>
                <button className={`border-0 p-2 ${subscriptionStatus ? 'bg-[#0000000d] text-textColor' : 'bg-red-700 text-white'} rounded-sm tracking-[0.5px] uppercase focus:border-0 focus:outline-none`}>
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>
            <div className="container mx-auto">
                <div className="grid grid-cols-3 m-2 lg:grid-cols-4">
                    {
                        videos?.map(video => (
                            <Video video={video} key={video.id} channelScreen />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ChannelScreen