import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        profileImage: null,
        fullName: "",
        gender: "",
        dob: "",
        permanentAddress: "",
        phoneNumber: "",
        personalEmail: "",
        idNumber: "",
        idIssuedDate: "",
        idIssuedPlace: ""
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'profileImage') {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
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
                <label className='block text-sm font-medium text-gray-700'>Tên đăng nhập</label>
                <input onChange={handleChange} type="text" name='name' placeholder='Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Email</label>
                <input type="email" onChange={handleChange} name='email' placeholder='Email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Mật khẩu</label>
                <input type="password" onChange={handleChange} name='password' placeholder='******' className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Vai trò</label>
                <select name='role' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md required'>
                    <option value="">Lựa chọn vai trò</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Nhân viên</option>
                </select>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Họ và tên</label>
                <input type="text" onChange={handleChange} name='fullName' placeholder='Full Name' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Ngày sinh</label>
                <input type="date" onChange={handleChange} name='dob' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Giới tính</label>
                <select name='gender' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md'>
                    <option value="">Giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                </select>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Email cá nhân</label>
                <input type="email" onChange={handleChange} name='personalEmail' placeholder='Personal Email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Số điện thoại</label>
                <input type="text" onChange={handleChange} name='phoneNumber' placeholder='Phone Number' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Địa chỉ thường trú</label>
                <input type="text" onChange={handleChange} name='permanentAddress' placeholder='Permanent Address' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Số CMND/CCCD</label>
                <input type="text" onChange={handleChange} name='idNumber' placeholder='ID Number' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Ngày cấp</label>
                <input type="date" onChange={handleChange} name='idIssuedDate' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Nơi cấp</label>
                <input type="text" onChange={handleChange} name='idIssuedPlace' placeholder='Issued Place' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700'>Ảnh đại diện</label>
                <input type="file" name='profileImage' onChange={handleChange} accept='image/*' className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
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
