import React from 'react'
import { NavLink } from 'react-router-dom'

export const AuthBar = () => {
  return (
    <>
        <nav className='mx-[25em] my-5 flex gap-10 font-medium font-cursive text-2xl'>
            <NavLink
            to='.'
            end
            className={({isActive}) => isActive ? 'authStyle' : null} >
                Login
            </NavLink>
            <NavLink
            to='signup'
            className={({isActive}) => isActive ? 'authStyle' : null} >
                Signup
            </NavLink>
        </nav>
    </>
  )
}
