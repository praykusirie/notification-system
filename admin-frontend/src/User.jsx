import React, { useEffect, useState } from 'react'
import { courses, years } from './Announcement'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const User = () => {
  const [students, setStudents] = useState({
    query: '',
    list: []
  })
  const [level, setLevel] = useState('')
  const [course, setCourse] = useState('')

  useEffect(() => {
    const fetchAllStudents = async () => {
        const response = await axios.get('/admin/getstudent')
        const allStudents = response.data
        setStudents({
          query: '',
          list: allStudents
        })
    }
    fetchAllStudents()
  }, [])

  const handleSearch = (e) => {
      e.preventDefault()
  
      const searchedStudents = students.list.filter(student => student.level === level && student.course === course)
      if(searchedStudents.length < 1) {
        toast.error('No user of that category')
        return
      }
      setStudents({
        query: '',
        list: searchedStudents
      })
  }



  const deleteStudent = async (id) => {
    const response = await axios.post('/admin/deletestudent', {
      id
    })
      toast.success('Deleted succesfully')
      const remainStudent = students.list.filter(student => student._id !== id)
      setStudents({
        query: '',
        list: remainStudent
      })
  }

  const handleChange = (e) => {
    const intendedUser = students.list.filter(student => {
      if(e.target.value === "") {
        return students.list
      } else {
        return student.lastname.toLowerCase().includes(e.target.value.toLowerCase())
      }
    })
    setStudents({
      query: e.target.value,
      list: intendedUser
    })
  }

  return (
    <>
      <div className='py-2 space-y-3'>
            <h1 className='text-3xl font-cursive'>List of students</h1>
        </div>
        <div>
          <form className='flex gap-5 my-8 items-center' onSubmit={handleSearch}>
                <div>
                  <label htmlFor="" className='block font-cursive pb-2'>Select Year of Study</label>
                  <select name="" id="" className='outline-none shadow-lg py-5 px-3 w-[300px] font-roboto'
                   value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    >
                    {years.map(year => {
                      return <option>{year}</option>
                    })}
                  </select>
                </div>
                <div>
                  <label htmlFor="" className='block font-cursive pb-2'>Select Year of Study</label>
                  <select name="" id="" className='outline-none shadow-lg py-5 px-3 w-[300px] font-roboto'
                   value={course}
                   onChange={(e) => setCourse(e.target.value)}>
                    {courses.map(course => {
                      return <option>{course}</option>
                    })}
                  </select>
                </div>
                <div className='mt-5'>
                  <button className='px-16 py-5 bg-gray-300 shadow-lg rounded-full'><i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div>
                <label htmlFor="" className='block font-cursive pb-2'>Search By Name</label>
                  <input type="search" placeholder='Search name here' onChange={handleChange} value={students.query} className='placeholder:text-black text-black outline-none shadow-lg py-4 px-3 w-[250px] font-roboto' />
                </div>
          </form>
          <table className='w-full border-collapse my-10 font-ubuntu'>
                <thead>
                  <tr className='text-left'>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
              {students.list.length < 1 ? (
              <p className='text-center font-cursive text-2xl font-semibold my-20 mx-10'>There is no user in database</p>
              ) : (

              students.list.map(student => {
                const { _id, firstname, lastname, course, pnumber} = student
                return (
                  <>
                  <tbody>
                    <tr>
                      <td className='uppercase'>{firstname} {lastname}</td>
                      <td>{course}</td>
                      <td>+{pnumber}</td>
                      <button className='px-4 py-1 bg-red-600 text-white rounded-full my-2' onClick={() => deleteStudent(_id)}>Delete</button> 
                    </tr>
                  </tbody>
                  </>
                )
              })
              )}
            
          </table>
        </div>
        <ToastContainer
            position='top-right' 
        />
    </>
  )
}
