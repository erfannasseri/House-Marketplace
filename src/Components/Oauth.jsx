import React from 'react'
import { useNavigate  , useLocation} from 'react-router-dom'
import { getAuth ,signInWithPopup ,GoogleAuthProvider} from 'firebase/auth'
import {doc , setDoc , getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/svg/googleIcon.svg'


function Oauth() {

    const Loaction = useLocation()
    const navigate = useNavigate()
    
    const onGoogleClick = async()=>{
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth,provider)
            const user = result.user
            //check user
            const docRef = doc(db,'users',user.uid)
            const docSnap = await getDoc(docRef)
            //if doesn't exist
            if(!docSnap.exists()){
                await setDoc(doc(db,'users',user.uid),{
                    name:user.displayName,
                    email:user.email,
                    timestamp:serverTimestamp()
                })
            }
            navigate('/')
            toast.success('You are sign in')
       } catch (error) {
        toast.error('Could not authorize with Google')
        console.log(error)
       } 
        
    }

  return (
    <div className='socialLogin'>
        <p>Sign {Loaction.pathname==='/sign-up'?'up':'in'} with</p>
        <button className='socialIconDiv' onClick={onGoogleClick}>
            <img className='socialIconImg' src={googleIcon} alt="google" />
        </button>
    </div>
  )
}

export default Oauth