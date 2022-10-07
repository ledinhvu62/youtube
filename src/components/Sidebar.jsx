import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
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
                <Link
                    to="/"
                    className="sidebar-item-link"
                >
                    <MdHome size={23} />
                    <span className="sidebar-text">Home</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link
                    to="/"
                    className="sidebar-item-link"
                >
                    <MdOutlineExplore size={23} />
                    <span className="sidebar-text">Explore</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link
                    to="/"
                    className="sidebar-item-link"
                >
                    <TiFlashOutline size={23} />
                    <span className="sidebar-text">Shorts</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link
                    to="/feed/subscriptions"
                    className="sidebar-item-link"
                >
                    <MdOutlineSubscriptions size={23} />
                    <span className="sidebar-text">Subscriptions</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link
                    to="/"
                    className="sidebar-item-link"
                >
                    <MdOutlineVideoLibrary size={23} />
                    <span className="sidebar-text">Library</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link
                    to="/"
                    className="sidebar-item-link"
                >
                    <MdOutlineHistory size={23} />
                    <span className="sidebar-text">History</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link
                    to="/"
                    className="sidebar-item-link"
                >
                    <RiVideoLine size={23} />
                    <span className="sidebar-text">Your videos</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link
                    to="/"
                    className="sidebar-item-link"
                >
                    <HiOutlineClock size={23} />
                    <span className="sidebar-text">Watch later</span>
                </Link>
            </li>
            <li className="sidebar-item">
                <Link
                    to="/"
                    className="sidebar-item-link"
                >
                    <RiThumbUpLine size={23} />
                    <span className="sidebar-text">Liked videos</span>
                </Link>
            </li>

            <li
                className="mt-10 px-6 sidebar-item"
                onClick={handleLogout}
            >
                <MdExitToApp size={23} />
                <span className="sidebar-text">Logout</span>
            </li>
        </nav>
    )
}

export default Sidebar