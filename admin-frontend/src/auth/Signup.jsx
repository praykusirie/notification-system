import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

const departments = [ 'Select Your Department', 'Informatics', 'Businness Management', 'Accounts and Finance', 'Postgraduate']

export const Signup = () => {
    const [fname, setFullname] = useState('')
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    

    const [register, { isLoading }] = useRegisterMutation()


    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const handleRegister = async (e) => {
        e.preventDefault()
        if(!fname || !department || !email || !password) {
            toast.error('All field are required')
            return
        }
        try {
            const res = await register({ fname, department, email, password }).unwrap()
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (error) {
            toast.error(error?.data?.message || error)
        }
        
    }
  return (
    <>
        <form action="" className='w-[600px] mx-auto my-5 shadow-2xl px-20 py-5 bg-[#f2f2f2]' onSubmit={handleRegister}>
           
            <div className='my-5 mx-auto'>
                <label htmlFor="" className='block my-5 mx-auto text-gray-600'>Full Name</label>
                <input type="text"
                className='w-full py-3 px-2 outline-none rounded border border-gray-500 shadow-lg'
                value={fname}
                onChange={(e) => setFullname(e.target.value)}
                />
            </div>
            <div className='my-5 mx-auto'>
                <label htmlFor="" className='block my-5 mx-auto text-gray-600'>Select Your Department</label>
                <select name="" id="" className="text-gray-600 w-full py-3 border border-solid border-gray-400 outline-none rounded-lg"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                >
                    {departments.map((department, i) => {
                        return <option value={department} key={i}>{department}</option>
                    })}
                </select>
            </div>
            <div className='my-5 mx-auto'>
                <label htmlFor="" className='block my-5 mx-auto text-gray-600'>Email</label>
                <input type="email" className='w-full py-3 px-2 outline-none rounded border border-gray-500 shadow-lg'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='my-5 mx-auto'>
                <label htmlFor="" className='block my-5 mx-auto text-gray-600'>Password</label>
                <input type="password" className='w-full py-3 px-2 outline-none rounded border border-gray-500 shadow-lg'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div class="flex justify-between items-center">
                <Link to='/' class="text-red-500 hover:text-red-800">Already have an account?</Link>
                <button class="px-10 py-2 bg-blue-700 cursor-pointer text-white border-none shadow-xl">Signin</button>
        </div>
        </form>
        <ToastContainer />
    </>
  )
}
