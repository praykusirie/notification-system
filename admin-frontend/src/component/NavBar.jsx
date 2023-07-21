import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice'
import { useLogoutMutation } from '../slices/userApiSlice'
import { useDispatch, useSelector } from 'react-redux'

export const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap()
      localStorage.removeItem('userInfo')
      // dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  const { userInfo } = useSelector((state) => state.auth)
  const { fname } = userInfo
  return (
    <>
    <div className='w-[250px] min-h-screen bg-[#d1cfcf] shadow-md '>
      <i class="fa-solid fa-user-tie fa-3x mx-20 my-10 bg-[#f2f2f2] p-7 shadow-lg rounded-full"></i>
      <p className='text-center text-xl font-medium font-cursive'>{fname.toUpperCase()}</p>
    <div className='flex flex-col  gap-10 px-8 items-start py-8 font-roboto'>
        <NavLink
         to='/'
         className={({isActive}) => isActive ? 'navStyle' : 'null'}
         >
          <i class="fa-solid fa-gauge-high mr-2"></i>
          Dashboard
        </NavLink>
        <NavLink
         to='/announcement'
         className={({isActive}) => isActive ? 'navStyle' : 'null'}
         >
          <i class="fa-solid fa-bullhorn mr-2"></i>
          Announcement
        </NavLink>
        <NavLink
         to='/user'
         className={({isActive}) => isActive ? 'navStyle' : 'null'}
         >
          <i class="fa-solid fa-user mr-2"></i>
          User List
        </NavLink>
        <NavLink
         to='/admin'
         className={({isActive}) => isActive ? 'navStyle' : 'null'}
         >
          <i class="fa-solid fa-plus mr-2"></i>
          Add User
        </NavLink>
        <Link
         className={({isActive}) => isActive ? 'navStyle' : 'null'}
         onClick={handleLogout}
         >
          <i class="fa-solid fa-right-from-bracket mr-2"></i>
          Logout
        </Link>
    </div>
    </div>
    </>
  )
}
