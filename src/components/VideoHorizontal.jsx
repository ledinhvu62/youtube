import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillEye } from 'react-icons/ai'
import moment from 'moment'
import numeral from 'numeral'

import request from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelDetails } from '../redux/channel/channelDetailsSlice'

const VideoHorizontal = ({ video, searchScreen }) => {
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

    const isVideo = !(id.kind === 'youtube#channel')

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
        getVideoDetails()
    }, [id])

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const navigate = useNavigate()

    const _channelId = resourceId?.channelId || channelId

    const handleClick = () => {
        isVideo
            ? navigate(`/watch/${id.videoId}`)
            : navigate(`/channel/${_channelId}`)
    }

    //

    const {
        statistics: channelStatistics,
    } = useSelector(state => state.channelDetails.channel)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChannelDetails(_channelId))
    }, [dispatch, _channelId])

    return (
        <div
            className="grid grid-cols-12 gap-2 mb-3 cursor-pointer"
            onClick={handleClick}
        >
            <div className={`${searchScreen ? "col-span-4" : "col-span-5"} relative text-center`}>
                <img
                    src={medium.url}
                    alt=""
                    className={`${isVideo ? "w-full h-full" : "w-36 h-36 rounded-full mx-auto"}`}
                />
                {
                    isVideo && (
                        <span className="absolute bottom-1 right-1 p-0.5 font-medium text-xs text-white bg-[#080808ec] rounded">{_duration}</span>
                    )
                }
            </div>
            <div className={`${searchScreen ? "col-span-8" : "col-span-7"} p-0`}>
                <p className={`format-string tracking-wide font-medium ${searchScreen ? "text-lg" : "text-sm"}`}>{title}</p>
                {
                    isVideo ? (
                        <>
                            <p className={`text-xs ${searchScreen ? "my-2" : "my-0.5"}`}>{channelTitle}</p>
                            <div className="flex items-center text-xs mb-2">
                                <span className="flex items-center">
                                    <AiFillEye className="mr-1" /> {numeral(views).format('0.a')} views
                                </span>
                                <span className="ml-3">{moment(publishedAt).fromNow()}</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center text-xs mb-2">
                            <span>{numeral(channelStatistics?.subscriberCount).format('0.a')} subscribers</span>
                            <span className="ml-3">{channelStatistics?.videoCount} videos</span>
                        </div>
                    )
                }
                {
                    searchScreen && (
                        <p className="text-xs">{description}</p>
                    )
                }
            </div>
        </div>
    )
}

export default VideoHorizontal