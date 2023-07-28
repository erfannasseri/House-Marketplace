import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {getAuth , signInWithEmailAndPassword} from 'firebase/auth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import Oauth from '../Components/Oauth'


function Signin() {

  const [showPass,setShowPass]=useState(false)
  
  const [formData,setFormdata]=useState({
    email:'',
    password:'',
  })
  
  const {email , password} = formData
  

  const navigate = useNavigate()

  const onChange =(e)=>{
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.id]:e.target.value
    }))
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCredential.user) {
        navigate('/house-marketplace')
        toast.done('شما باموفقیت وارد شدید')
      }
    } catch (error) {
      toast.error('ایمیل یا رمزعبور اشتباه است.')
      console.log(error)
    }
  }

  return (
    <>
    
    <div className="pageContainer">
      <header>
        <p className='pageHeader'>صفحه ورود</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <div className='emailInputDiv'>
            <input 
              type="email" 
              className="emailInput"
              placeholder='ایمیل'
              id='email'
              value={email}
              onChange={onChange} />
          </div>
          <div className="passwordInputDiv">
          <input 
              type={showPass?'text':'password'} 
              className="passwordInput"
              placeholder='رمزعبور'
              id='password'
              value={password}
              onChange={onChange} 
              autoComplete="on"/>
              <img src={visibilityIcon} alt="Show Password" className="showPassword" onClick={()=>setShowPass((prevState)=>!prevState)}/>
              {/*showPass?<p Curssor='select' onClick={()=>setShowPass((prevState)=>!prevState)}>Hide</p>:<p onClick={()=>setShowPass((prevState)=>!prevState)}>Show</p>*/}
          </div>
          <Link to='/house-marketplace/forgot-password'
          className='forgotPasswordLink'>
            فراموشی رمزعبور
          </Link>
          <div className="signInBar ">
            <p className="p signInText ">
              ورود
            </p>
            <button className='signInButton'>
              <ArrowRightIcon fill='white' width='40px' height='40px' /> 
            </button>
          </div>
        </form>

        <Oauth/>

        <Link to='/house-marketplace/sign-up' className='registerLink'>ثبت نام</Link>

      </main>
    </div>

    </>
  )
}

export default Signin