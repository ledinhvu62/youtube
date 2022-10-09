import React from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const Comment = ({ comment }) => {
    const { authorChannelId, authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } = comment

    const navigate = useNavigate()

    const handleChannelClick = () => {
        navigate(`/channel/${authorChannelId.value}`)
    }

    return (
        <div className="flex my-4 text-sm">
            <img
                src={authorProfileImageUrl}
                alt=""
                className="rounded-full mr-3 w-12 h-12 cursor-pointer"
                onClick={handleChannelClick}
            />
            <div>
                <div className="flex mb-1">
                    <span
                        className="font-medium mr-1 cursor-pointer"
                        onClick={handleChannelClick}
                    >
                        {authorDisplayName}
                    </span>
                    <span className="text-textColor font-normal text-[13px] pt-[0.5px]">{moment(publishedAt).fromNow()}</span>
                </div>
                <div className="mb-0" dangerouslySetInnerHTML={{ __html: textDisplay }}></div>
            </div>
        </div>
    )
}

export default Comment