import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
//import { Helmet } from 'react-helmet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
 import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../Components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

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

  return (
    <>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            >{br}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    <main>

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

<div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing.bedroom > 1
              ? `${listing.bedroom} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathroom > 1
              ? `${listing.bathroom} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/house-marketplace/contact/${listing.userRef}?
            listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}

      </div>
    </main>
    </>
  )
}

export default Listing