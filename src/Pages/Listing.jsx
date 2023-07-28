import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Slider from "react-slick";

import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../Components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'



function Listing() {

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
      try {
        const fetchListing = async () => {
          const docRef = doc(db, 'listing', params.listingId)
          const docSnap = await getDoc(docRef)
            console.log(docSnap.data())
            if(docSnap.exists()){
              setListing(docSnap.data())
              setLoading(false)
            }        
        }     
        
        fetchListing()

      } catch (error) {
        console.log(error)
      }
          
      }, [])

    if (loading) {
        return <Spinner />
      }
      
      const br = (<><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></>)
      

      listing.imageUrls.map((url,index) => (
        console.log(listing.imageUrls[index]
      )))

      
  return (
    <div>
      <div className='sliderrr'>
        <img className='img' src={listing.imageUrls[0]} alt="" />
      </div>
    <main>
        {/*listing.imageUrls.map((url, index) => (
          <div className='sliderrr'>
            <img className='img' src={listing.imageUrls[index]} alt="" />
          </div>
        ))*/}
      

      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

<div className='listingDetails '>
        <p className='listingName'>
          {listing.name}
        </p>
        <p className='listingName'>     
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} تومان
        </p>
        <p className='listingLocation'>{listing.location}</p>

        

        <ul className='listingDetailsList'>
          <li>
           مساحت : {listing.Meterage} متر مربع
          </li>
          <li>
          تعداد اتاق : {listing.bedroom} اتاق
          </li>

          <li>{listing.parking && 'دارای پارکینگ'}</li>
          <li>{listing.furnished && 'مبله'}</li>
        <p className='listingdiscribe listingDetailsP'>{listing.description}</p>
        </ul>


        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/house-marketplace/contact/${listing.userRef}?
            listingName=${listing.name}`}
            className='primaryButton contactLandlord'
          >
            ارتباط با مالک
          </Link>
        )}

      </div>
    </main>
    </div>
  )
}

export default Listing