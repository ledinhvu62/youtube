import React from 'react'
import { useSelector } from 'react-redux'
import { FaBars } from 'react-icons/fa'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiVideoAddLine } from 'react-icons/ri'
import { MdOutlineNotificationsNone } from 'react-icons/md'

import logo from '../assets/img/logo.png'

const Header = ({ toggleSidebar }) => {
    const user = useSelector(state => state.auth?.user)

    return (
        <div className="flex justify-between items-center p-4 h-[10vh] w-full fixed top-0 z-[999] bg-white border-solid border-b-2 sm:py-4 sm:px-12">
            <FaBars
                className="block sm:hidden"
                size={23}
                onClick={() => toggleSidebar()}
            />
            
            <img
                src={logo}
                alt="logo"
                className="w-20 h-20 object-contain hidden sm:block"
            />
            
            <form action="" className="flex-1 items-center flex p-0.5 mx-4 my-0 rounded border-2 border-solid sm:flex-[0.6]">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full border-none font-medium bg-transparent p-1 text-textColor focus:outline-none"
                />
                <button
                    type="submit"
                    className="py-1 px-5 border-l-2 border-solid focus:border-none"
                >
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className="flex [&>*:not(img)]:hidden flex-[0.15] justify-around items-center sm:[&>*:not(img)]:block">
                <RiVideoAddLine size={23} />
                <MdOutlineNotificationsNone size={23} />
                <img
                    src={user?.photoURL}
                    alt="avatar"
                    className="rounded-full w-10 object-contain ml-1"
                />
            </div>
        </div>
    )
}

export default Header