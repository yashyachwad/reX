import React, { useState } from 'react'
import { Input } from './Inputs'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import API_PATHS from '../utils/apiPaths';


const CreateResumeForm = () => {

const [ title , setTitle] = useState("")
const [error, setError] =useState(null)
const navigate = useNavigate();


const handleCreateResume = async (e) => {
    e.preventDefault();

    if(!title){
        setError("Please Enter resume title")
        return 
    }
    setError("")
    try{
console.log("Creating resume with title:", title);      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      })
      if(response.data?._id){
        navigate(`/resume/${response.data?._id}`)
      }
    }
    catch(error){
      if(error.response && error.response.data.message){
      setError(error.response.data.message)
      }
      else{
        setError('Something went wrong , Please try again.')
      }
    }
}


  return (
    <div className='w-full max-w-md p-5 bg-blue-200 rounded-xl border border-gray-700 shadow-sm'> 
      <h3 className='text-xl font-bold text-gray-900 mb-2'> Create New Resume </h3>
      <p className='text-gray-600 mb-8'>
        Give a title to your resume to get started. Can customize later.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input value={title} onChange={({target}) => setTitle(target.value)}
        lable='Resume Title' placeholder='e.g., Yash - S/w Engineer.'
        type='text'/>

        {error && <p className='text-red-500 text-sm mb-4'> {error} </p>}

        <button type='submit' className='w-full py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-rose-200 transition-all'>
          Create Resume 
        </button>
      </form>
    </div>
  )
}

export default CreateResumeForm
