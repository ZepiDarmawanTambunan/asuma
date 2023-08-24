import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

function Dashboard({children}) {
  return (
    <div className="flex h-screen">
    <Navbar />
    <div className="flex w-screen">
      <Sidebar />
      <div className="overflow-y-auto w-full bg-[#F5F5F5]">
        {children}
        <Footer />
      </div>
    </div>
  </div>
  )
}

export default Dashboard