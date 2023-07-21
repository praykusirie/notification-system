import React from 'react'
import user from '../assets/user.jpg'
export const AdminBar = () => {
  return (
    <>
        <nav className='flex justify-between items-center px-10 py-5 w-[68em] bg-[#e5e2e2] shadow-lg my-2'>
            <i class="fa-solid fa-bars"></i>
            <div className='flex items-center'>
                <input type="text" placeholder='Search Your Activities here' className='px-2 py-3 shadow outline-none w-[400px]'/>
            </div>
            <img src={user} alt="" className='w-10 h-10 rounded-full object-cover' />
            <div className='relative'>
            <i class="fa-solid fa-comments cursor-pointer"></i>
            <p className='absolute -top-2 left-5 text-lg font-medium'>5</p>
            </div>
            <div className='relative'>
            <i class="fa-solid fa-bell cursor-pointer"></i>
            <p className='absolute -top-2 left-4 text-lg font-medium'>10</p>
            </div>
        </nav>
    </>
  )
}
