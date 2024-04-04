import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const userid = localStorage.getItem('id')

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        try{const res = await axios.post('http://localhost:5000/app/login',
        {email,password})
        if (res.data) {
            // alert(res.data);
            console.log(res.data);
          }
          if(res.data.authToken){
            localStorage.setItem("authToken",res.data.authToken)
            localStorage.setItem("username",res.data.username)
            localStorage.setItem("id",res.data.userid)
            localStorage.setItem('email',res.data.email)
            // const cartItems = localStorage.getItem(`cartItems_${userid}`);
            navigate('/products')
          }
    }
    catch(e){console.log(e)}
    }

  return (
    <div className='container-fluid d-flex align-items-center logs justify-content-center'>
        <form className='br-5 rounded my-5 p-4 lform'>
            <h4 className='text-danger'>Login Here</h4>
        <div className='form-group'>
            Email:<input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} className='form-control' />
        </div>
        <div className='form-group'>
            Password:<input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='form-control' />
        </div>
        <div className='form-group'>
            <input type='submit' onClick={handleSubmit} className='form-control mt-2' />
        </div>
        </form>
    </div>
  )
}

export default Login