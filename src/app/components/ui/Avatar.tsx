import Image from 'next/image'
import React, { FC } from 'react'

type AvatarProps = {
    src: string | null | undefined
    alt: string
}

const Avatar: FC<AvatarProps> = ({ src, alt }) => {
    if (!src) return null 

    return (
        <div className='relative rounded-full w-8 h-8 md:w-12 md:h-12 overflow-hidden'>
            <Image
                src={src}
                alt={alt}
                fill 
                className='object-cover'
                sizes="(max-width: 768px) 32px, 48px" 
            />
        </div>
    )
}

export default Avatar
