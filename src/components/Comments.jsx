import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Comment from './Comment'

import { getCommentsOfVideoById, addComment } from '../redux/comments/commentListSlice'

const Comments = ({ videoId, totalComments }) => {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.commentList.comments)
    const { photoURL } = useSelector(state => state.auth?.user)
    const [text, setText] = useState('')

    useEffect(() => {
        dispatch(getCommentsOfVideoById(videoId))
    }, [videoId, dispatch])

    const _comments = comments?.map(
        comment => comment.snippet.topLevelComment.snippet
    )

    const handleComment = e => {
        e.preventDefault()
        if (text.length === 0) return

        dispatch(addComment({ videoId, text }))
        setText('')
        setTimeout(() => dispatch(getCommentsOfVideoById(videoId)), 30000)
    }

    return (
        <div>
            <p>{totalComments} Comments</p>
            <div className="flex w-full my-2">
                <img
                    src={photoURL}
                    alt=""
                    className="rounded-full mr-3 w-12 h-12 object-contain"
                />
                <form
                    className="flex flex-grow"
                    onSubmit={handleComment}
                >
                    <input
                        type="text"
                        className="p-2 flex-grow text-textColor rounded-l-sm border-none focus:outline-none"
                        placeholder="Add a comment..."
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button className="p-2 bg-borderColor tracking-[0.5px] rounded-r-sm border-none focus:border-none focus:outline-none">Comment</button>
                </form>
            </div>
            <div>
                {
                    _comments?.map((comment, index) => (
                        <Comment comment={comment} key={index} />
                    ))
                }
            </div>
        </div>
    )
}

export default Comments