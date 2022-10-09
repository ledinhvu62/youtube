import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'

import request from '../api'

const VideoHorizontal = ({ video, searchScreen, subScreen }) => {
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            description,
            title,
            publishedAt,
            thumbnails: { medium },
            resourceId
        }
    } = video

    const isVideo = !(id.kind === 'youtube#channel' || subScreen)

    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)

    useEffect(() => {
        const getVideoDetails = async () => {
            const {
                data: { items }
            } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: id.videoId
                }
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount)
        }
        isVideo && getVideoDetails()
    }, [id, isVideo])

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const [subscriberCount, setSubscriberCount] = useState(null)
    const [videoCount, setVideoCount] = useState(null)

    const _channelId = resourceId?.channelId || channelId

    useEffect(() => {
        const getChannelDetails = async () => {
            const {
                data: { items }
            } = await request('/channels', {
                params: {
                    part: 'statistics',
                    id: _channelId
                }
            })
            setSubscriberCount(items[0].statistics.subscriberCount)
            setVideoCount(items[0].statistics.videoCount)
        }
        isVideo || getChannelDetails()
    }, [_channelId, isVideo])

    const navigate = useNavigate()

    const handleClick = () => {
        isVideo
            ? navigate(`/watch/${id.videoId}`)
            : navigate(`/channel/${_channelId}`)
    }

    const handleChannelClick = e => {
        e.stopPropagation()
        navigate(`/channel/${_channelId}`)
    }

    return (
        <div
            className={`grid grid-cols-12 gap-2 ${searchScreen || subScreen ? 'mb-5' : 'mb-3'} cursor-pointer`}
            onClick={handleClick}
        >
            <div className={`${searchScreen || subScreen ? 'col-span-4' : 'col-span-5'} relative text-center`}>
                <img
                    src={medium.url}
                    alt=""
                    className={`${isVideo ? 'w-full h-full' : 'w-36 h-36 rounded-full mx-auto'}`}
                />
                {
                    isVideo && (
                        <span className="absolute bottom-1 right-1 p-0.5 font-medium text-xs text-white bg-[#080808ec] rounded">{_duration}</span>
                    )
                }
            </div>
            <div className={`${searchScreen || subScreen ? 'col-span-8' : 'col-span-7'} p-0 ${isVideo ? '' : 'flex flex-col justify-center'}`}>
                <h3 className={`format-string font-medium ${searchScreen || subScreen ? 'text-lg' : 'text-sm'}`}>{title}</h3>
                {
                    isVideo ? (
                        <>
                            <h4
                                className={`text-xs ${searchScreen ? 'my-2' : 'my-0.5'}`}
                                onClick={e => handleChannelClick(e)}
                            >
                                {channelTitle}
                            </h4>
                            <div className="flex items-center text-xs mb-2">
                                <span className="flex items-center">{numeral(views).format('0.a')} views</span>
                                <span className="ml-3">{moment(publishedAt).fromNow()}</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center text-xs my-2">
                            <span>{numeral(subscriberCount).format('0.a')} subscribers</span>
                            <span className="ml-3">{videoCount} videos</span>
                        </div>
                    )
                }
                {
                    (searchScreen || subScreen) && (
                        <p className="format-string text-xs">{description}</p>
                    )
                }
            </div>
        </div>
    )
}

export default VideoHorizontal