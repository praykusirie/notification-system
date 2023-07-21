import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';


export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const { userInfo } = useSelector((state) => state.auth)

  //  useEffect(() => {
  //    if(userInfo) {
  //        navigate('/')
  //    }
  //  }, [navigate, userInfo])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setCredentials({...res}))
      navigate('/')
    } catch (error) {
      toast.error(error?.data?.message || error)
    }
  }
  return (
    <>
      <form action="" className='w-[600px] mx-auto my-5 shadow-2xl px-20 py-5 bg-[#f2f2f2]' onSubmit={handleLogin}>
            <div className='my-10 mx-auto'>
                <label htmlFor="" className='block my-5 mx-auto text-gray-600'>Email</label>
                <input type="email" className='w-full py-3 px-2 outline-none rounded border border-gray-500 shadow-lg'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='my-10 mx-auto'>
                <label htmlFor="" className='block my-5 mx-auto text-gray-600'>Password</label>
                <input type="password" className='w-full py-3 px-2 outline-none rounded border border-gray-500 shadow-lg' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div class="flex justify-between items-center">
              <a href="#" class="text-blue-500 hover:text-blue-800">Forgot Your Password</a> 
              <button class="px-10 py-2 bg-red-800 cursor-pointer text-white border-none shadow-xl">Login</button>
            </div>
        </form>
        <ToastContainer />
    </>
  )
}
