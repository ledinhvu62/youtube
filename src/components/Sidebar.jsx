import React from 'react'
import { useDispatch } from 'react-redux'
import { MdOutlineSubscriptions, MdExitToApp, MdOutlineHistory, MdOutlineVideoLibrary, MdHome, MdOutlineExplore } from 'react-icons/md'
import { TiFlashOutline } from 'react-icons/ti'
import { RiVideoLine, RiThumbUpLine } from 'react-icons/ri'
import { HiOutlineClock } from 'react-icons/hi'

import { logout } from '../redux/auth/authSlice'

const Sidebar = ({ showSidebar, toggleSidebar }) => {
    const dispatch = useDispatch()
    
    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav
            className={`border-solid border-r-2 flex flex-col w-24 h-[90vh] fixed top-[10vh] left-0 z-[999] bg-white ${showSidebar ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'} transition-transform duration-200 ease-in sm:sticky lg:w-64`}
            onClick={() => toggleSidebar()}
        >
            <li className="sidebar-item">
                <MdHome size={23} />
                <span className="sidebar-text">Home</span>
            </li>
            <li className="sidebar-item">
                <MdOutlineExplore size={23} />
                <span className="sidebar-text">Explore</span>
            </li>
            <li className="sidebar-item">
                <TiFlashOutline size={23} />
                <span className="sidebar-text">Shorts</span>
            </li>
            <li className="sidebar-item">
                <MdOutlineSubscriptions size={23} />
                <span className="sidebar-text">Subscriptions</span>
            </li>
            <li className="sidebar-item">
                <MdOutlineVideoLibrary size={23} />
                <span className="sidebar-text">Library</span>
            </li>
            <li className="sidebar-item">
                <MdOutlineHistory size={23} />
                <span className="sidebar-text">History</span>
            </li>
            <li className="sidebar-item">
                <RiVideoLine size={23} />
                <span className="sidebar-text">Your videos</span>
            </li>
            <li className="sidebar-item">
                <HiOutlineClock size={23} />
                <span className="sidebar-text">Watch later</span>
            </li>
            <li className="sidebar-item">
                <RiThumbUpLine size={23} />
                <span className="sidebar-text">Liked videos</span>
            </li>

            <li
                className="mt-10 sidebar-item"
                onClick={handleLogout}
            >
                <MdExitToApp size={23} />
                <span className="sidebar-text">Logout</span>
            </li>
        </nav>
    )
}

export default Sidebar