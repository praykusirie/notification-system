import React, { useEffect, useState } from 'react'
import user1 from './assets/user1.jpg'
import user2 from './assets/user2.jpg'
import user3 from './assets/user3.jpg'
import user4 from './assets/user4.jpg'
import axios from 'axios'
import { useSelector } from 'react-redux'


export const Home = () => {
    const[delivered, setDelivered] = useState()

     useEffect(() => {
        const getDeliveredReport = async () => {
            const response = await axios.get('/admin/getdelivered')
            const report = response.data
            setDelivered(report)
        }

        getDeliveredReport()
     }, [])

       
  return (
    <>
        <div className='py-2 space-y-3'>
            <h1 className='text-3xl font-cursive'>Welcome back</h1>
            <p className='font-ubuntu text-lg text-gray-600'>We got you covered with all your last activity</p>
        </div>
        <div className='grid grid-cols-3 items-center  gap-5 py-2'>
            <div className='bg-[#e7e6e6] p-10 shadow-lg font-cursive text-center rounded-sm space-y-1'>
               <p>Delivered messages</p> 
               <p className='text-2xl'>{delivered}</p>
               <i class="fa-solid fa-envelope-circle-check fa-2x"></i>
            </div>
            <div className='bg-[#e7e6e6] p-10 shadow-lg font-cursive text-center rounded-sm space-y-1'>
               <p>Unsussecfull messages</p> 
               <p className='text-2xl'>0</p>
               <i class="fa-solid fa-comment-slash fa-2x"></i>
            </div>
            <div className='bg-[#e7e6e6] p-10 shadow-lg font-cursive text-center rounded-sm space-y-1'>
               <p>Total message</p> 
               <p className='text-2xl'>{delivered}</p>
               <i class="fa-solid fa-message fa-2x"></i>
            </div>
        </div>
        <div>
            <h1 className='py-5 font-cursive'>Your Activities</h1>
            <table className='w-full border-collapse my-1 font-ubuntu'>
                <thead>
                    <tr className='text-left'>
                        <th>Sent To</th>
                        <th>Activity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src={user1} alt=""  className='w-10 h-10 rounded-full object-cover'/></td>
                        <td>Sending Message</td>
                        <td className='text-green-600 font-semibold'>Sent</td>
                    </tr>
                    <tr>
                        <td><img src={user2} alt=""  className='w-10 h-10 rounded-full object-cover'/></td>
                        <td>Sending Message</td>
                        <td className='text-red-600 font-semibold'>Failed</td>
                    </tr>
                    <tr>
                        <td><img src={user3} alt=""  className='w-10 h-10 rounded-full object-cover'/></td>
                        <td>Sending Message</td>
                        <td className='text-green-600 font-semibold'>Sent</td>
                    </tr>
                    <tr>
                        <td><img src={user4} alt=""  className='w-10 h-10 rounded-full object-cover'/></td>
                        <td>Sending Message</td>
                        <td className='text-orange-600 font-semibold'>Pending</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
    </>
  )
}
