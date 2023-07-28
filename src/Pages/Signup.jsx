import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth,createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import { db } from '../firebase.config'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import { setDoc,doc,serverTimestamp } from 'firebase/firestore'
import {toast} from 'react-toastify'
import Oauth from '../Components/Oauth'



function Signup() {

  const [showPass,setShowPass]=useState(false)
  
  const [formData,setFormdata]=useState({
    name:'',
    email:'',
    password:'',
  })
  
  const {name, email , password} = formData
  

  const navigate = useNavigate()

  const onChange =(e)=>{
    
    setFormdata((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  
  const onSubmit = async (e)=>{
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth,email,password)
      const user = userCredential.user
      updateProfile(auth.currentUser,{
        displayName: name,
      })
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()
     
      await setDoc(doc(db,'users',user.uid),formDataCopy)
     
      navigate('/house-marketplace')
    } catch (error) {
      toast.error('Somthing went wrong with registration')
      console.log(error)
    }
  }

  return (
    <>
    
    <div className="pageContainer">
      <header>
        <p className='pageHeader'>صفحه ثبت نام</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <div className='nameInputDiv'>
            <input 
              type="text" 
              className="nameInput"
              placeholder='نام'
              id='name'
              value={name}
              onChange={onChange} />
          </div>
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
              autoComplete="on" />
              <img src={visibilityIcon} alt="Show Password" className="showPassword" onClick={()=>setShowPass((prevState)=>!prevState)}/>
              {/*showPass?<p Curssor='select' onClick={()=>setShowPass((prevState)=>!prevState)}>Hide</p>:<p onClick={()=>setShowPass((prevState)=>!prevState)}>Show</p>*/}
          </div>
          <div className="signUpBar">
            <p className="p signUpText">
              ثبت نام
            </p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='white' width='40px' height='40px' /> 
            </button>
          </div>
        </form>

        <Oauth/>

        <Link to='/house-marketplace/sign-in' className='registerLink'>ورود</Link>

      </main>
    </div>

    </>
  )
}

export default Signup