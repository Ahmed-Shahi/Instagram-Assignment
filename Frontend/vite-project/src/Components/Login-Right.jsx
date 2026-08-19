import React from 'react'
import InstaImg from '../assets/instagram.png'
import MainImg from '../assets/main-photo.webp'
import "./Login-Right.css"
function LoginRight() {
    return (

        <div className='login-right'>
            <img src={InstaImg} alt="instagram" className='insta-logo' />
            <p className='insta-text'>See everyday moments from <br /> your <span className='close-friends'>close friends.</span></p>
            <img src={MainImg} alt="main-img" className='main-img' />
        </div>

    )
}

export default LoginRight