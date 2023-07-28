import React from 'react'
import { useParams , useSearchParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { doc , getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from'react-toastify'

function Contact() {
    const params = useParams()
    const [Landlord,setLandload] = useState(null)
    const [Massage,setMassage] = useState("")
    const [SearchParams,SetSearchParams] = useSearchParams()

    useEffect(()=>{
        const getLandlord = async ()=>{
            try {
                const userRef = doc(db,'users',params.landlordId)
                const docSnap = await getDoc(userRef)
                if(docSnap.exists()){
                    setLandload(docSnap.data())
                    //console.log(Landlord.name)
                }else{
                    toast.error('Could not get Landlord data')
                }
            } catch (error) {
                console.log(error);
            }
        }
        getLandlord()
    },[params.landlordId])

    const onChange = (e)=>{
        setMassage(e.target.value)
    }
  return (
    <div className='pageContainer'>
        <header>
            <p className='pageHeader'>ارتباط با مالک</p>
        </header>
        {Landlord !==null &&(
                <main>
                    <div className='contactLandlord'>
                        <p className='landlordName'>{Landlord.name}</p>
                    </div>
        <form className='messageForm'>
            <div className='messageDiv'>
                <label 
                htmlFor='message'
                className='messageLabel'>
                    پیام
                </label>
                <textarea 
                className='input'
                name='message'
                id='message'
                onChange={onChange}/>
            </div>    
                <a href={`mailto:${Landlord.email}?subject=${SearchParams.get('listingName')}&body=${Massage}`}>
                    <button className='primaryButton' type='button'>
                        ارسال ایمیل
                    </button>
                </a>
        </form>
                </main>
        )}
    </div>
  )
}


export default Contact