import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import numeral from 'numeral'
import moment from 'moment'
import { RiThumbUpLine, RiThumbDownLine } from 'react-icons/ri'
import { MdContentCut, MdPlaylistAdd } from 'react-icons/md'
import { IoIosShareAlt } from 'react-icons/io'
import { HiDownload } from 'react-icons/hi'
// import ShowMoreText from 'react-show-more-text'

import { getChannelDetails, checkSubscriptionStatus } from '../redux/channel/channelDetailsSlice'

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
    const { channelId, channelTitle, description, title, publishedAt } = snippet
    const { viewCount, likeCount } = statistics
    const { snippet: channelSnippet, statistics: channelStatistics } = useSelector(state => state.channelDetails.channel)
    const subscriptionStatus = useSelector(state => state.channelDetails.subscriptionStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId])

    return (
        <div className="pb-2">
            <div className="font-medium">
                <h4 className="text-xl">{title}</h4>
                <div className="flex my-2 text-sm">
                    <span className="mr-3">{numeral(viewCount).format('0.a')} views</span>
                    <span>{moment(publishedAt).fromNow()}</span>
                </div>
                <div className="flex">
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
                <div className="format-string whitespace-pre-line font-normal my-2">
                    {/* <ShowMoreText
                    lines={3}
                    more="SHOW MORE"
                    less="SHOW LESS"
                    anchorClass="showMoreText"
                    expanded={false}
                > */}
                    {description}
                    {/* </ShowMoreText> */}
                </div>
            </div>
            <div className="flex justify-between items-center my-2 p-2 border border-solid border-borderColor rounded-sm">
                <div className="flex">
                    <img
                        src={channelSnippet?.thumbnails?.default?.url}
                        alt=""
                        className="rounded-full mr-3 w-12 h-12 cursor-pointer"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium cursor-pointer">{channelTitle}</span>
                        <span className="text-sm text-textColor">{numeral(channelStatistics?.subscriberCount).format('0.a')} subscribers</span>
                    </div>
                </div>
                <button className={`border-0 p-2 m-2 ${subscriptionStatus ? 'bg-[gray]' : 'bg-red-700'} text-white rounded-sm tracking-[0.5px] uppercase focus:border-0 focus:outline-none`}>
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>
        </div>
    )
}

export default VideoMetaData