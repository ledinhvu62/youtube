import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { getPopularVideos, getVideosByCategory } from '../redux/videos/homeVideosSlice'

const keywords = [
    'All',
    'React',
    'Vue',
    'Angular',
    'HTML',
    'CSS',
    'Tailwind',
    'React Native',
    'Firebase',
    'Sass',
    'Redux',
    'Youtube API',
    'VS Code',
    'Figma',
    'UI/UX',
    'Frontend',
    'Backend'
]

const CategoriesBar = () => {
    const [activeElement, setActiveElement] = useState('All')
    const dispatch = useDispatch()
    
    const handleClick = keyword => {
        if (keyword === 'All') {
            dispatch(getPopularVideos())
        } else {
            dispatch(getVideosByCategory(keyword))
        }
        setActiveElement(keyword)
    }

    return (
        <div className="no-scrollbar px-5 py-3 text-sm flex overflow-scroll sticky top-[10vh] bg-white z-[998] border-b border-solid border-borderColor">
            {
                keywords.map((keyword, index) => (
                    <span
                        key={index}
                        onClick={() => handleClick(keyword)}
                        className={`mr-4 px-3 py-1 whitespace-nowrap border border-solid border-borderColor rounded-full cursor-pointer ${activeElement === keyword ? 'text-white bg-black' : 'bg-[#0000000d] hover:bg-[#0000001a]'}`}
                    >
                        {keyword}
                    </span>
                ))
            }
        </div>
    )
}

export default CategoriesBar