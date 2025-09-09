import React, { FC } from 'react'

type NavigatorProps = {
    title: string
}

const Navigator: FC<NavigatorProps> = ({ title }) => {
    return (
        <div className='text-2xl text-violet-950 font-bold cursor-pointer'>{title}</div>
    )
}

export default Navigator