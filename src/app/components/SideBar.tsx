'use client'

import React, { useState } from 'react'
import Modal from './Modal'
import { close } from './svg'
import { useRouter } from 'next/navigation'
import Button from './ui/button'

const SideBar = () => {
    const [closeModal, setCloseModal] = useState(false)
    const router = useRouter()

    const closeHandler = () => {
        localStorage.removeItem('userData')
        router.replace('/login')
        setCloseModal(true)
    }

    return (
        <div>
            {/* Footer bar */}
            <div className="fixed bottom-0 p-6">
                <div className="flex items-center gap-4 w-full">
                    <span>{close}</span>
                    <div
                        className="text-violet-950 cursor-pointer sm:text-md md:text-lg lg:text-xl"
                        onClick={() => setCloseModal(true)}
                    >
                        Logout
                    </div>
                </div>
            </div>

            {/* Logout confirmation modal */}
            <Modal
                isOpen={closeModal}
                onClose={() => setCloseModal(false)}
            >
                <div className="flex flex-col gap-6 sm:gap-8">
                    <p className='sm:text-lg md:text-xl lg:text-2xl'>
                        Are you sure you want to log out?
                    </p>
                    <div className="flex justify-between">
                        <div className=""></div>
                        <div className="flex gap-4">
                            <Button variant='outline' onClick={() => setCloseModal(false)}>Cancel</Button>
                            <Button onClick={closeHandler}>Logout</Button>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default SideBar
