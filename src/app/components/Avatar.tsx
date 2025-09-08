import Image from 'next/image'
import React, { FC } from 'react'

type AvatarProps = {
    src: string
    alt: string
}

const Avatar: FC<AvatarProps> = ({ src, alt }) => {
    return (
        <div className='rounded-full'>
            <Image src={src} alt={alt} width={48} height={48} className='rounded-full'/>
        </div>
    )
}

export default Avatar