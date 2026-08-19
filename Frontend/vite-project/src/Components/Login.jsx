import { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


function Login() {
    const navigate = useNavigate();
    const baseurl="https://instagram-assignment-ivory.vercel.app"
    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });

    const handleLoginbtn = (e) => {
        e.preventDefault();
        console.log(formData);
        
        axios.post(baseurl+"/auth/login",formData)
        .then((res)=>{
            console.log(res.data);
            alert(res.data)
        })
        .catch((err)=>{
            console.log(err);
            alert(err.data)
        })
    }
    const handleSignUpBtn = () => {
        navigate('/signup')
    }
    return (
        <div className='login-container'>
            <h1 className='login-title'>Login Into Instagram</h1>
            <form className='login-form' onSubmit={handleLoginbtn}>
                <input type="text" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}
                 placeholder='Mobile Number, Username or Email' /><br />
                <input type="password" value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}
                 placeholder='Password' /><br />
                <button type='submit'>Log in</button><br />
                <a  href="">Forgot Password?</a>
            </form>
            <br />
            <button className='login-fb'>Log in with Facebook</button><br />
            <button className='create-account' onClick={handleSignUpBtn}>Create New Account</button>
        </div>
    )
}

export default Login