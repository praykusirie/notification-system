import React from 'react'
import { NavBar } from '../component/NavBar'
import { Outlet } from 'react-router-dom'
import { AdminBar } from '../component/AdminBar'

export const NavbarLayout = () => {
  return (
    <>
    <div className='flex w-full gap-5'>
        <NavBar />
        <div>
            <AdminBar />
            <Outlet />
        </div>
    </div>
    </>
  )
}
