'use client'

import Image from 'next/image'

const Dashboard = () => {
    return (
        <div className="grid place-content-center">
            <Image src="/illus.png" alt='dashboard' width={500} height={500} priority/>
        </div>
    )
}

export default Dashboard
