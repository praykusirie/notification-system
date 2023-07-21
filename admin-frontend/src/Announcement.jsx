import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import messagePic from './assets/message.png'
import { useSelector } from 'react-redux';
export const years = ['Select level of study','Certificate', 'Diploma 1', 'Diploma 2', 'Bachelor 1', 'Bachelor 2', 'Bachelor 3']
 export const courses = ['Select the course','Bachelor Degree in Finance and Banking', 'Bachelor Degree in Business Management', 'Bachelor Degree in Computer Science', 'Bachelor Degree in Information Technology', 'Bachelor Degree in Procurement & Logistics Management', 'Bachelor Degree in Economics and Finance', 'Bachelor Degree in Accountancy', 'Bachelor Degree in Economics and Taxation', 'Bachelor Degree in Accountancy with Information Technology', 'Bachelor Degree in Banking with Apprenticeship', 'Bachelor Degree in Insurance and Risk Management with Apprenticeship','Bachelor Degree in Education with Computer Science', 'Bachelor Degree in Library Studies and Information Science', 'Bachelor Degree in Credit Management', 'Bachelor Degree in Security and Strategic Studies', 'Bachelor Degree in Tourism and Hospitality Management with Apprenticeship', 'Bachelor Degree in Cyber Security', 'Bachelor Degree in Human Resources and Management', 'Bachelor Degree in Marketing and Public Relations', 'Bachelor Degree in Economics and Project Management ', 'Diploma in Accountancy and Microfinance', 'Diploma in Procurement and Logistics Management', 'Diploma in Human Resources Management', 'Diploma in Business Management with Chinese', 'Diploma in Records, Archive & Information Management', 'Diploma in Accountancy with IT', 'Diploma in Computer Networking', 'Diploma in Computer Science', 'Diploma in Economics and Finance', 'Diploma in Finance and Banking', 'Diploma in Information Technology', 'Diploma in Insurance and Risk Management', 'Diploma in Accountancy', 'Diploma in Library and Information Studies', 'Diploma in Mobile Application Development', 'Diploma in Multimedia', 'Ordinary Diploma in Business Management']


export const Announcement = () => {
  const [level, setLevel] = useState('')
  const [course, setCourse] = useState('')
  const [message, setmessage] = useState('')
  const { userInfo } = useSelector((state) => state.auth)

  const { fname } = userInfo
  

    useEffect(() => {
      const fetchNumber = async () => {
        const response = await axios.get('/admin/getstudent')
        const users = response.data
        localStorage.setItem('students', JSON.stringify(users))
        // setstudents(users)
        
      }
      fetchNumber()
    },[])

  const handleAnnouncement = async (e) => {
    e.preventDefault()
    try {
    
      if(!level || !course || !message) {
        toast.error('All required field should be added')
        return
      }

      const students = JSON.parse(localStorage.getItem('students'))
      // here we want the students that are the level and course as needed by admin
      const requiredStudents = students.filter(student => student.level === level && student.course === course)
      
      if(requiredStudents.length < 1) {
        toast.error('No students obtained from such categories')
        return
      }

      const numbers = requiredStudents.map((guy) => {
        const { pnumber } = guy
        return pnumber
      })

      if(numbers.length < 1) {
        toast.error('Something is wrong please try again')
        return
      }
      // setNumber(giveNumber)
      console.log(numbers)

       const res = await axios.post('/admin/sendmessage', {
          numbers,
          message,
          fname
       })
       toast.success('Message delivered succesfully')
       console.log(res.data)

       setLevel('')
       setCourse('')
       setmessage('')
    } catch (error) {
      toast.error('Something is wrong please try again')
       console.log(error)
    }
    
    
  }
  
  return (
    <>
        <div className='py-2 space-y-3'>
            <h1 className='text-3xl font-cursive'>Send text to students</h1>
            <p className='font-ubuntu text-lg text-gray-600'>Deliver your intended message to your students</p>
        </div>
        <div className='flex bg-[#fffbfb]  w-full h-[450px] shadow-lg mt-2 rounded-tl-3xl rounded-bl-3xl'>
          <div>
              <img src={messagePic} alt="" className='py-10'/>
          </div>
          <form action="" className='bg-[#dddcdc] rounded-tl-3xl w-full p-5 shadow-lg space-y-10 rounded-bl-3xl' onSubmit={handleAnnouncement}>
            <div>
              <label htmlFor="" className='block font-cursive pb-2'>Select Level of Study</label>
              <select name="" id="" className='outline-none shadow-lg py-5 px-3 w-[610px] font-roboto' value={level} onChange={(e) => setLevel(e.target.value)}>
                {years.map(year => {
                  return <option>{year}</option>
                })}
              </select>
            </div>
            <div>
              <label htmlFor="" className='block font-cursive pb-2'>Select Course</label>
              <select name="" id="" className='outline-none shadow-lg p-5 font-roboto' value={course} onChange={(e) => setCourse(e.target.value)}>
                {courses.map(course => {
                  return <option>{course}</option>
                })}
              </select>
            </div>
            <div className='flex'>
              <textarea name="" id="" cols="71" rows="5" placeholder='Type your text here.......' className='shadow-lg px-2 py-3 outline-none' value={message} onChange={(e) => setmessage(e.target.value)}></textarea>
              <button className='bg-white p-3 '><i class="fa-regular fa-paper-plane fa-2x"></i></button>
            </div>
          </form>
        </div>
        <ToastContainer
            position='top-right' 
        />
    </>
  )
}

