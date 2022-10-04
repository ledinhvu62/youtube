import React from 'react'
import { AiFillEye } from 'react-icons/ai'
// import request from '../api'
import moment from 'moment'
import numeral from 'numeral'

const VideoHorizontal = () => {
    const seconds = moment.duration(100).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    return (
        <div className="grid grid-cols-12 gap-2 mb-3 cursor-pointer">
            <div className="col-span-5 relative text-center">
                <img
                    src="https://i.ytimg.com/vi/ZtmIq0lVMeI/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCo1ibGBuq3vtQSPvmAfiyU-S-L9Q"
                    alt=""
                    className="w-full h-full"
                />
                <span className="absolute bottom-1 right-1 p-0.5 font-medium text-xs text-white bg-[#080808ec] rounded">{_duration}</span>
            </div>
            <div className="col-span-7 p-0">
                <p className="format-string text-sm tracking-wide font-medium">
                    Fully Functional YouTube Clone | React | Redux | Firebase | YouTube API
                </p>
                <p className="text-xs my-0.5">Le Dinh Vu</p>
                <div className="flex items-center text-xs">
                    <span className="flex items-center">
                        <AiFillEye className="mr-1" /> {numeral(10000).format('0.a')} views
                    </span>
                    <span className="ml-3">{moment('2022-06-6').fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default VideoHorizontal