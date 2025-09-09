'use client'

import React, { FC, PropsWithChildren, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { Button } from './components/ui'
import { burger } from './components/svg'
import Modal from './components/Modal'
import { LoginResponseType } from './lib/types'

const SideBar = dynamic(() => import('./components/SideBar'), { ssr: false })
const UserData = dynamic(() => import('./components/UserData'), { ssr: false })

type MainLayoutProps = PropsWithChildren

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [closeModal, setCloseModal] = useState(false)
  const [parsedUserData, setParsedUserData] = useState<LoginResponseType | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('userData')

    if (!data) {
      router.replace('/login') 
      return
    }

    setParsedUserData(JSON.parse(data) as LoginResponseType)
    setLoading(false)
  }, [router])

  const closeHandler = () => {
    localStorage.removeItem('userData')
    router.replace('/login')
    setCloseModal(false)
  }

  if (loading) return null

  const userName = parsedUserData
    ? `${parsedUserData.results[0]?.name.title || ''}. ${parsedUserData.results[0]?.name.first || ''} 
    ${parsedUserData.results[0]?.name.last || ''}`
    : ''
  const userAlt = parsedUserData ? parsedUserData.results[0]?.name.first || '' : ''
  const userEmail = parsedUserData ? parsedUserData.results[0]?.email || '' : ''
  const userPicture = parsedUserData ? parsedUserData.results[0]?.picture?.medium || '/avatar.png' : '/avatar.png'

  return (
    <div className="grid grid-cols-11">
      {/* Sidebar */}
      <div
        className={`
          fixed md:relative z-20 h-screen bg-violet-50 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 col-span-2
        `}
      >
        <SideBar setCloseModal={setCloseModal} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="col-span-11 md:col-span-9 h-screen bg-white flex flex-col md:ml-0">
        <div className="bg-violet-200 h-[10vh] shadow-md p-6 flex items-center justify-between">
          <div
            className="md:hidden p-2 rounded bg-violet-300 cursor-pointer"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {burger}
          </div>

          {typeof window !== 'undefined' && (
            <UserData
              name={userName}
              alt={userAlt}
              picture={userPicture}
              email={userEmail}
            />
          )}
        </div>

        <div className="p-4">{children}</div>
      </div>

      {/* Logout Modal */}
      <Modal isOpen={closeModal} onClose={() => setCloseModal(false)}>
        <div className="flex flex-col gap-4 sm:gap-6 sm:p-6 md:p-2 w-[90vw] sm:w-[300px] md:w-[400px] lg:w-[500px] max-w-full bg-white rounded-lg">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-center">
            Are you sure you want to log out?
          </p>
          <div className="flex gap-2 sm:gap-4 mt-2 justify-end">
            <Button variant="outline" onClick={() => setCloseModal(false)}>
              Cancel
            </Button>
            <Button onClick={closeHandler}>Logout</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default MainLayout
