import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import { useNavigate } from 'react-router-dom'
const Add = () => {
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {

        const getDepartments = async () => {
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments()
    }, [])

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if(name === 'profileImage'){
            setFormData((prevData) => ({...prevData, [name]: files[0]}))
        }else{
            setFormData((prevData) => ({...prevData, [name]: value}))
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) =>{
            formDataObj.append(key, formData[key])
        })
        try{
            const response = await axios .post('http://localhost:5000/api/employee/add', formDataObj,{
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
    <div className='bg-white min-h-screen'>
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-black'>Thêm mới nhân viên</h2>
      <form onSubmit={handleSubmit}>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
            <label className='block text-sm font-medium text-gray-700'>User ID</label>
            <input onChange={handleChange} type='text' name='userId' placeholder='User ID' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Mã nhân viên</label>
            <input type='text' onChange={handleChange} name='employeeId' placeholder='Employee ID' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Họ tên</label>
            <input onChange={handleChange} type='text' name='fullName' placeholder='Full name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Email cá nhân</label>
            <input type='email' onChange={handleChange} name='personalEmail' placeholder='Personal Email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Số điện thoại</label>
            <input type='text' onChange={handleChange} name='phoneNumber' placeholder='Phone Number' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Địa chỉ thường trú</label>
            <input type='text' onChange={handleChange} name='permanentAddress' placeholder='Address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Số CMND/CCCD</label>
            <input type='text' onChange={handleChange} name='idNumber' placeholder='ID Number' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Ngày cấp</label>
            <input type='date' onChange={handleChange} name='idIssuedDate' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Nơi cấp</label>
            <input type='text' onChange={handleChange} name='idIssuedPlace' placeholder='Issued Place' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Ngày sinh</label>
            <input type='date' onChange={handleChange} name='dob' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Giới tính</label>
            <select name='gender' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'>
                <option value=''>Giới tính</option>
                <option value='male'>Nam</option>
                <option value='female'>Nữ</option>
                <option value='other'>Khác</option>
            </select>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Tình trạng hôn nhân</label>
            <select name='maritalStatus' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'>
                <option value=''>Tình trạng hôn nhân</option>
                <option value='single'>Độc thân</option>
                <option value='married'>Đã kết hôn</option>
            </select>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Chức danh</label>
            <input type='text' onChange={handleChange} name='designation' placeholder='Designation' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Phòng ban</label>
            <select name='department' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'>
                <option value=''>Lựa chọn phòng ban</option>
                {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                ))}
            </select>
        </div>

        <div>
            <label className='block text-sm font-medium text-gray-700'>Ảnh chân dung</label>
            <input type='file' name='profileImage' onChange={handleChange} accept='image/*' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
        </div>
    </div>
        <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded required'>
            Thêm nhân viên
        </button>
      </form>
    </div>
    </div>
  )
}

export default Add
