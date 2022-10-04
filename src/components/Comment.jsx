import React from 'react'
import moment from 'moment'

const Comment = ({ comment }) => {
    const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } = comment

    return (
        <div className="flex my-4 text-sm">
            <img
                src={authorProfileImageUrl}
                alt=""
                className="rounded-full mr-3 w-12 h-12 cursor-pointer"
            />
            <div>
                <div className="flex mb-1 cursor-pointer">
                    <span className="font-medium mr-1">{authorDisplayName}</span>
                    <span className="text-textColor font-normal text-[13px] pt-px">{moment(publishedAt).fromNow()}</span>
                </div>
                <div className="mb-0" dangerouslySetInnerHTML={{ __html: textDisplay }}></div>
            </div>
        </div>
    )
}

export default Comment