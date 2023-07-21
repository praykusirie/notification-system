import React, { useEffect, useState } from 'react'
import user1 from './assets/user1.jpg'
import { courses, years } from './Announcement'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminInfo = () => {
    const [level, setLevel] = useState('')
    const [course, setCourse] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [pnumber, setPnumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const addNewUser = async(e) => {
        e.preventDefault()
        
        try {
            
            if(!firstname || !lastname || !level || !course || !pnumber || !email || !password) {
                toast.error('User details are required')
                return
            }
            
            if(!pnumber.startsWith('255')) {
                toast.error('Number should start with 255')
                return
            }

            if(pnumber.length !== 12) {
                toast.error('Phone number is not correct')
                return
            }
            const response = await axios.post('/admin/addstudent', {
                    firstname,
                    lastname,
                    level,
                    course,
                    pnumber,
                    email,
                    password
            })  
            if(response.status === 200) {
                toast.success('New user added succesfully')
            }
            setFirstname('')
            setLastname('')
            setLevel('')
            setCourse('')
            setPnumber('')
            setEmail('')
            setPassword('')
        } catch (error) {
            if(error.response.data.message === 'User already exists') {
                toast.error('User already exists')
            } else {
                console.log(error.message)
            }
        }
            
    }
  return (
    <>
        <div className='py-2 space-y-3'>
            <h1 className='text-3xl font-cursive'>Add new college</h1>
            <p className='font-ubuntu text-lg text-gray-600'>Add all the neccesary infomartion of new user</p>
        </div>
        <form action="" className='' onSubmit={addNewUser}>
            <div className='space-y-3 text-center'>
                {/* <img src={user1} alt="" className='w-20 h-20 rounded-full object-cover ml-[32em]'/> */}
                <i class="fa-solid fa-user-plus fa-2x"></i>
                <h1 className='font-cursive'>Add New User</h1>
            </div>
            <div className='ml-[20em] my-2'>
                <div>
                    <label htmlFor="" className='block font-cursive py-2'>Add Firstname</label>
                    <input type="text" className='outline-none border-b border-gray-500 w-[30em]' value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="" className='block font-cursive py-2'>Add Lastname</label>
                    <input type="text" className='outline-none border-b border-gray-500 w-[30em]' value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="" className='block font-cursive py-2'>Add Level</label>
                    {/* <input type="email" className='outline-none border-b border-gray-500 w-[30em]'/> */}
                    <select name="" id="" className='outline-none border-b border-gray-500 w-[30em]' value={level} onChange={(e) => setLevel(e.target.value)}>
                        {years.map(year => {
                        return <option>{year}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="" className='block font-cursive py-2'>Add Course</label>
                    {/* <input type="email" className='outline-none border-b border-gray-500 w-[30em]'/> */}
                    <select name="" id="" className='outline-none border-b border-gray-500 w-[30em]' value={course} onChange={(e) => setCourse(e.target.value)}>
                        {courses.map(course => {
                        return <option>{course}</option>
                        })}
                    </select>
                </div>
                <div>
                    <label htmlFor="" className='block font-cursive py-2'>Add Phone Number</label>
                    <input type="text" className='outline-none border-b border-gray-500 w-[30em]' value={pnumber} onChange={(e) => setPnumber(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="" className='block font-cursive py-2'>Add Email</label>
                    <input type="email" className='outline-none border-b border-gray-500 w-[30em]' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="" className='block font-cursive py-2'>Add Password</label>
                    <input type="password" className='outline-none border-b border-gray-500 w-[30em]' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <button className='text-white bg-black px-10 py-3 my-7 rounded-full ml-[29em]'>Add User</button>
        </form>
        <ToastContainer
            position='top-right' 
        />
    </>
  )
}
