'use client'

import React, { Dispatch, FC, SetStateAction } from 'react'
import { close } from './svg'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import { Navigator } from './ui'

type SideBarProps = {
    setCloseModal: Dispatch<SetStateAction<boolean>>
    setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const SideBar: FC<SideBarProps> = ({ setCloseModal,setSidebarOpen }) => {

    return (
        <div className='flex p-4 flex-col items-center'>
            <div className="absolute top-1 right-2 text-xl
             text-violet-950 cursor-pointer hover:bg-violet-200
             px-2 rounded-lg sm:hidden"
             onClick={()=> setSidebarOpen(false)}>X</div>
            <div className="mb-12">
                <Image src={Logo} alt='logo' className='h-16 w-16' />
            </div>

            <div className="w-full">
                <Navigator title='Dashboard' />
            </div>

            {/* Footer Logout */}
            <div className="fixed bottom-0 p-4 sm:p-6 w-full">
                <div className="flex items-center gap-2 sm:gap-4 ">
                    <span>{close}</span>
                    <div
                        className="text-violet-950 cursor-pointer text-sm sm:text-md md:text-lg lg:text-xl"
                        onClick={() => setCloseModal(true)}
                    >
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
