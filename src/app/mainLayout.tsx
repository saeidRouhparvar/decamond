'use client'

import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import SideBar from './components/SideBar'
import UserData from './components/UserData'
import { burger } from './components/svg'
import Modal from './components/Modal'
import { Button } from './components/ui'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { LoginResponseType } from './lib/types'

type MainLayoutProps = PropsWithChildren

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [closeModal, setCloseModal] = useState(false)
    const router = useRouter()

    const [parsedUserData, setParsedUserData] = useState<LoginResponseType | null>(null);

    useEffect(() => {
        const data = localStorage.getItem('userData')
        if (data) {
            setParsedUserData(JSON.parse(data) as LoginResponseType)
        } else {
            router.replace('/login')
            toast.error('Your Authentication is failed!!')
        }
    }, [router])



    const closeHandler = () => {
        localStorage.removeItem('userData')
        router.replace('/login')
        setCloseModal(false)
    }

    useEffect(() => {
        const userData = localStorage.getItem('userData')
        if (!userData) {
            router.replace('/login')
            toast.error('Your Authentication is failed!!')
        }
    }, [router])

    return (
        <div className='grid grid-cols-11'>
            <div className={`
                fixed md:relative z-20 h-screen bg-violet-50 transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 col-span-2
            `}>
                <SideBar setCloseModal={setCloseModal} setSidebarOpen={setSidebarOpen} />
            </div>

            <div className="col-span-11 md:col-span-9 h-screen bg-white flex flex-col md:ml-0">
                <div className="bg-violet-200 h-[10vh] shadow-md p-6 flex items-center justify-between">
                    <div
                        className="md:hidden p-2 rounded bg-violet-300"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {burger}
                    </div>

                    {parsedUserData && (
                        <UserData
                            name={`${parsedUserData.results[0]?.name.title || ''}. ${parsedUserData.results[0]?.name.first || ''} ${parsedUserData.results[0]?.name.last || ''}`}
                            alt={parsedUserData.results[0]?.name.first || ''}
                            picture={parsedUserData.results[0]?.picture?.medium || '/default-avatar.png'}
                            email={parsedUserData.results[0]?.email || ''}
                        />
                    )}

                </div>

                <div className="p-4">{children}</div>
            </div>

            <Modal
                isOpen={closeModal}
                onClose={() => setCloseModal(false)}
            >
                <div className="flex justify-start flex-col gap-4 sm:gap-6 sm:p-6 md:p-2 w-[90vw] sm:w-[300px] md:w-[400px] lg:w-[500px] max-w-full bg-white rounded-lg">
                    <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-center'>
                        Are you sure you want to log out?
                    </p>
                    <div className="flex gap-2 sm:gap-4 mt-2">
                        <Button variant='outline' onClick={() => setCloseModal(false)}>Cancel</Button>
                        <Button onClick={closeHandler}>Logout</Button>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default MainLayout
