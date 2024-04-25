import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [message,setMessage]=useState()
  const navigate =useNavigate()
  useEffect(()=>{
    axios.get('/profile')
    .then(res=> {
      if(res.data.valid){
        setMessage(res.data.message)
      }else{
        navigate('/login')
      }
    })
    .catch(err=>console.log(err))
  })
  
  return (
    <h1>Hello babies {message}</h1>
  )
}

export default Dashboard