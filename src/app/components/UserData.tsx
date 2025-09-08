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
        <div className='flex items-center gap-4'>
            <Avatar src={picture} alt={alt} />
            <div className="flex flex-col gap-1 text-neutral-800 lg:text-md sm:text-sm">
                <span className="">{name}</span>
                <span className="">{email}</span>
            </div>
        </div>
    )
}

export default UserData