import React from 'react'
import { getAuth , sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcone } from '../assets/svg/keyboardArrowRightIcon.svg'
import { async } from '@firebase/util'


function ForgotPassword() {
  const [ email, setEmail ] = useState ('')
  
  const onChange = (e) =>{
    setEmail(e.target.value )
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('Could not send reset email')
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input 
            type="email" 
            className='emailInput' 
            onChange={onChange}
            id='email'
            value={email}
            placeholder='Email'
              />
          <Link className='forgotPasswordLink' to={'/sign-in'}>Sign in</Link>
           <div className='signInBar'>
              <div className='signInText'>Send Reset Link</div>
              <button className=' signInButton'>
                <ArrowRightIcone fill='#ffffff' width='37px' height='37px' />
              </button>
           </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword 