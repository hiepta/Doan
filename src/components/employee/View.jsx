import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const View = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState(null)

    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            if(response.data.success){
                setEmployee(response.data.employee)
            }
          }catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
          }
        }
        fetchEmployee();
      }, [])
  return (
    <>{employee ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-8 text-center text-black'>
            Hồ sơ nhân viên
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <img src={`http://localhost:5000/${employee.userId.profileImage}`} alt="" className='rounded-full border w-72 text-black'/>
            </div>
            <div>
                <div className='flex space-x-3 mb-5'>
                    <p className='text-lg font-bold text-black'>Tên nhân viên: </p>
                    <p className='font-medium text-black'>{employee.userId.name} </p>
                </div>

                <div className='flex space-x-3 mb-5'>
                    <p className='text-lg font-bold text-black'>Mã nhân viên: </p>
                    <p className='font-medium text-black'>{employee.employeeId} </p>
                </div>

                <div className='flex space-x-3 mb-5'>
                    <p className='text-lg font-bold text-black'>Ngày sinh: </p>
                    <p className='font-medium text-black'>{new Date(employee.dob).toLocaleDateString()} </p>
                </div>

                <div className='flex space-x-3 mb-5'>
                    <p className='text-lg font-bold text-black'>Giới tính: </p>
                    <p className='font-medium text-black'>{employee.gender} </p>
                </div>

                <div className='flex space-x-3 mb-5'>
                    <p className='text-lg font-bold text-black'>Phòng ban: </p>
                    <p className='font-medium text-black'>{employee.department.dep_name} </p>
                </div>

                <div className='flex space-x-3 mb-5'>
                    <p className='text-lg font-bold text-black'>Tình trạng hôn nhân: </p>
                    <p className='font-medium text-black'>{employee.maritalStatus} </p>
                </div>
            </div>
        </div>
        <div>
        </div>
    </div>
    ): <div>Loading ...</div>}</>
  )
}

export default View
