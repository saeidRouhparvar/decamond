import React, { FC, PropsWithChildren } from 'react'
import SideBar from './components/SideBar'
import UserData from './components/UserData';
type MainLayoutProps = PropsWithChildren

const MainLayout: FC<MainLayoutProps> = ({ children }) => {

    const userData = localStorage.getItem('userData')
    const parsedUserData = JSON.parse(`${userData}`)
    const userInfo = parsedUserData?.results?.[0]
    const userName = `${userInfo?.name?.title}. ${userInfo?.name?.first} ${userInfo?.name?.last}`
    console.log(parsedUserData?.results?.[0])

    return (
        <div className='grid grid-cols-11'>
            <div className="col-span-2 h-screen bg-violet-50">
                <SideBar />
            </div>
            <div className="col-span-9 h-screen bg-white flex flex-col">
                <div className="bg-violet-200 h-[10vh] shadow-md p-6">
                    <UserData
                        name={userName}
                        alt={userName}
                        picture={userInfo?.picture?.medium}
                        email={userInfo?.email}
                    />
                </div>
                <div className="p-4">{children}</div>
            </div>

        </div>
    )
}

export default MainLayout