import React, { useEffect, useState } from 'react'
import './../settingstyle.css'
import pictest from './../img/1.jpg'
import { MdDoubleArrow } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import{RiUpload2Fill} from "react-icons/ri";
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function Setting() {
    const navigate=useNavigate()
    const islogin=useSelector((state)=>state.islogin)

    const token=useSelector((state)=>state.token)
    const[proInfo , setProInfo]=useState({})

    const getprofile=async()=>{
      try{
       const {data :{user}}=await axios.get("http://kzico.runflare.run/user/profile",{
       
        headers:{
          authorization:`Bearer ${token}`
      }
       })

       setProInfo(user)
      }catch(error){
         console.log(error.response.data)
      }
  
  
  
    }
    useEffect(()=>{

  
      getprofile()

     },[islogin])

  return (
    <div className='section setting_container'>
        <section className='setting_navcontainer'>
        <div className='settingNav'>
        <div className='fullwidth fullwidth_top' onClick={()=>{navigate("ChangeProfile")}}> <p className='setting_navItem border-bottom'><FaUserCog className='me-4'/>Change profile<MdDoubleArrow className='settin_Ricon'/></p></div>
        <div className='fullwidth' onClick={()=>{navigate("changePassword")}}><p className='setting_navItem border-bottom'><RiLockPasswordFill className='me-4'/>Change password<MdDoubleArrow className='settin_Ricon'/></p></div>
        <div className=' fullwidth fullwidth_botton' onClick={()=>{navigate("uploadAvatar")}}>   <p className='setting_navItem border-bottom'><RiUpload2Fill className='me-4'/>Upload avatar<MdDoubleArrow className='settin_Ricon'/></p></div>

        </div>
        </section>
        <Outlet/>

    </div>
  )
}
