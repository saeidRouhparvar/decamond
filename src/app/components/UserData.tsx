import React, { FC } from 'react'
import { Avatar } from './ui'

type UserDataProps = {
    picture: string
    alt: string
    email: string
    name: string
}

const UserData: FC<UserDataProps> = ({ picture, alt, email, name }) => {
    return (
        <div className='flex items-center gap-2 sm:gap-1 md:gap-3'>
            <Avatar src={picture} alt={alt} />
            <div className="flex flex-col text-neutral-800">
                <span className="text-sm sm:text-xs md:text-base lg:text-lg font-medium">{name}</span>
                <span className="text-xs sm:text-[10px] md:text-sm lg:text-md text-neutral-600">{email}</span>
            </div>
        </div>
    )
}

export default UserData
