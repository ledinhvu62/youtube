import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import numeral from 'numeral'
import moment from 'moment'
import { RiThumbUpLine, RiThumbDownLine } from 'react-icons/ri'
import { MdContentCut, MdPlaylistAdd } from 'react-icons/md'
import { IoIosShareAlt } from 'react-icons/io'
import { HiDownload } from 'react-icons/hi'
import ShowMoreText from 'react-show-more-text'

import { getChannelDetails, checkSubscriptionStatus } from '../redux/channel/channelDetailsSlice'

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
    const { channelId, channelTitle, description, title, publishedAt } = snippet
    const { viewCount, likeCount } = statistics
    const { snippet: channelSnippet, statistics: channelStatistics } = useSelector(state => state.channelDetails.channel)
    const subscriptionStatus = useSelector(state => state.channelDetails.subscriptionStatus)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getChannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId])

    const handleChannelClick = () => {
        navigate(`/channel/${channelId}`)
    }

    return (
        <div className="pb-2">
            <div className="font-medium">
                <h4 className="text-xl">{title}</h4>
                <div className="flex my-2 text-sm">
                    <span className="mr-3">{numeral(viewCount).format('0.a')} views</span>
                    <span>{moment(publishedAt).fromNow()}</span>
                </div>
                <div className="whitespace-pre-line font-normal my-2">
                    <ShowMoreText
                        lines={2}
                        more="Show more"
                        less="Show less"
                        anchorClass="font-medium"
                        expanded={false}
                    >
                        {description}
                    </ShowMoreText>
                </div>
                <div className="flex flex-wrap">
                    <div className="video-option">
                        <RiThumbUpLine size={26} />
                        <span className="video-option-text">{numeral(likeCount).format('0.a')}</span>
                    </div>
                    <div className="video-option">
                        <RiThumbDownLine size={26} />
                        <span className="video-option-text">Dislike</span>
                    </div>
                    <div className="video-option">
                        <IoIosShareAlt size={26} />
                        <span className="video-option-text">Share</span>
                    </div>
                    <div className="video-option">
                        <HiDownload size={26} />
                        <span className="video-option-text">Download</span>
                    </div>
                    <div className="video-option">
                        <MdContentCut size={26} />
                        <span className="video-option-text">Cut</span>
                    </div>
                    <div className="video-option">
                        <MdPlaylistAdd size={26} />
                        <span className="video-option-text">Save</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center my-2 p-2 border border-solid border-borderColor rounded-sm">
                <div className="flex">
                    <img
                        src={channelSnippet?.thumbnails?.default?.url}
                        alt=""
                        className="rounded-full mr-3 w-12 h-12 cursor-pointer"
                        onClick={handleChannelClick}
                    />
                    <div className="flex flex-col">
                        <span
                            className="font-medium cursor-pointer"
                            onClick={handleChannelClick}
                        >
                            {channelTitle}
                        </span>
                        <span className="text-sm text-textColor">{numeral(channelStatistics?.subscriberCount).format('0.a')} subscribers</span>
                    </div>
                </div>
                <button className={`border-0 p-2 ${subscriptionStatus ? 'bg-[#0000000d] text-textColor' : 'bg-red-700 text-white'} rounded-sm tracking-[0.5px] uppercase focus:border-0 focus:outline-none`}>
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>
        </div>
    )
}

export default VideoMetaData