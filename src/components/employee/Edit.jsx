import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import { useNavigate, useParams } from 'react-router-dom'


const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        designation: '',
        salary: 0,
        department: ''
    })
    const navigate = useNavigate()
    const {id} = useParams()
    const [departments, setDepartments] = useState(null) 

    useEffect(() => {

        const getDepartments = async () => {
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments()
    }, [])

    useEffect(() => {

        const fetchEmployee = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/employee/${id}`,{
                headers: {
                  "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
              })
              console.log(response.data)
              if(response.data.success){
                const employee = response.data.employee
                setEmployee((prev) => ({...prev, name: employee.userId.name, maritalStatus: employee.maritalStatus,
                designation: employee.designation, salary: employee.salary, department: employee.department
                }))
              }
            }catch(error){
              if(error.response && !error.response.data.success){
                alert(error.response.data.error)
              }
            }
          }
          fetchEmployee();
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
            setEmployee((prevData) => ({...prevData, [name] : value}))
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios .put(`http://localhost:5000/api/employee/${id}`, employee,{
              headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
              }
            })
            if(response.data.success){
              navigate("/admin-dashboard/employees")
            }
          }catch(error){
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }
          }
    }
  return (
    <>{departments && employee ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-black'>Sửa thông tin nhân viên</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Tên nhân viên: </label>
                <input onChange={handleChange} value={employee.name} type="text" name='name' placeholder='Insert Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
            </div>
        </div>
        
        <div>
            <label className='block text-sm font-medium text-gray-700'>Tình trạng hôn nhân</label>
            <select name='maritalStatus' value={employee.maritalStatus} onChange={handleChange} placeholder='Marital Status' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'>
                <option value="">Lựa chọn tình trạng</option>
                <option value="single">Độc thân</option>
                <option value="married">Đã kết hôn</option>
            </select>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Chức danh</label>
            <input type="text" onChange={handleChange} value={employee.designation} name='designation' placeholder='Designation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Lương</label>
            <input type="number" onChange={handleChange} value={employee.salary} name='salary' placeholder='Salary' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div className='col-span-2'>
            <label className='block text-sm font-medium text-gray-700'>Phòng ban</label>
            <select name='department' value={employee.department} onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'>
                <option value="">Lựa chọn phòng ban</option>
                {departments.map((dep) =>(
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
            </select>
        </div>

        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded required'>
            Chỉnh sửa nhân viên
        </button>
      </form>
    </div>
    ) : <div>Loading ...</div>}</>
  )
}

export default Edit
