import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthBar } from '../component/AuthBar'

export const AuthLayout = () => {
  return <>
    <AuthBar />
    <Outlet />
  </>
  
}
