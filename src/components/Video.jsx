import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

import request from '../api'

const Video = ({ video, channelScreen }) => {
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            title,
            publishedAt,
            thumbnails: { medium }
        },
        contentDetails
    } = video

    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const _videoId = id?.videoId || contentDetails?.videoId || id

    const navigate = useNavigate()

    useEffect(() => {
        const getVideoDetails = async () => {
            const {
                data: { items }
            } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: _videoId
                }
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount)
        }
        getVideoDetails()
    }, [_videoId])

    useEffect(() => {
        const getChannelIcon = async () => {
            const {
                data: { items }
            } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId
                }
            })
            setChannelIcon(items[0].snippet.thumbnails.default)
        }
        getChannelIcon()
    }, [channelId])

    const handleVideoClick = () => {
        navigate(`/watch/${_videoId}`)
    }

    const handleChannelClick = e => {
        e.stopPropagation()
        navigate(`/channel/${channelId}`)
    }

    return (
        <div
            className="mb-4 p-3 cursor-pointer"
            onClick={handleVideoClick}
        >
            <div className="mb-2 relative">
                <img
                    src={medium.url}
                    alt=""
                    className="w-full"
                />
                <span className="absolute bottom-1 right-1 p-0.5 font-medium text-xs text-white bg-[#080808ec] rounded">{_duration}</span>
            </div>
            <div className="flex items-start">
                {
                    channelScreen || (
                        <img
                            src={channelIcon?.url}
                            alt=""
                            className="w-9 h-9 rounded-full mr-2"
                            onClick={e => handleChannelClick(e)}
                        />
                    )
                }
                <div>
                    <h4 className="line-clamp-2 min-h-[40px] font-medium text-[15px]">{title}</h4>
                    {
                        channelScreen || (
                            <span
                                className="line-clamp-1 my-px text-textColor text-[13px]"
                                onClick={e => handleChannelClick(e)}
                            >
                                {channelTitle}
                            </span>
                        )
                    }
                    <div className="flex items-center text-textColor text-[13px]">
                        <span className="flex items-center">{numeral(views).format('0.a')} views</span>
                        <span className="ml-3">{moment(publishedAt).fromNow()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video