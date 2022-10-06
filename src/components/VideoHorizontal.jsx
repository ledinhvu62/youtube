import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillEye } from 'react-icons/ai'
import moment from 'moment'
import numeral from 'numeral'

import request from '../api'

const VideoHorizontal = ({ video }) => {
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

    const handleClick = () => {
        navigate(`/watch/${id.videoId}`)
    }

    return (
        <div
            className="grid grid-cols-12 gap-2 mb-3 cursor-pointer"
            onClick={handleClick}
        >
            <div className="col-span-5 relative text-center">
                <img
                    src={medium.url}
                    alt=""
                    className="w-full h-full"
                />
                <span className="absolute bottom-1 right-1 p-0.5 font-medium text-xs text-white bg-[#080808ec] rounded">{_duration}</span>
            </div>
            <div className="col-span-7 p-0">
                <p className="format-string text-sm tracking-wide font-medium">{title}</p>
                <p className="text-xs my-0.5">{channelTitle}</p>
                <div className="flex items-center text-xs">
                    <span className="flex items-center">
                        <AiFillEye className="mr-1" /> {numeral(views).format('0.a')} views
                    </span>
                    <span className="ml-3">{moment(publishedAt).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default VideoHorizontal