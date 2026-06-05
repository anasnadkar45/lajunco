import Navbar from '@/components/layout/Navbar'
import Topbar from '@/components/layout/Topbar'
import Footer from '@/components/layout/Footer'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='min-h-screen'>
            <Topbar />
            <Navbar />
            <div className='mt-24'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default layout