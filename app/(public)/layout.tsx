import Navbar from '@/components/layout/Navbar'
import Topbar from '@/components/layout/Topbar'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen'>
            <Topbar />
            <Navbar />
            <div className='mt-20'>
                {children}
            </div>
        </div>
    )
}

export default layout