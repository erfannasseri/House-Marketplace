import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import Parking from '../assets/svg/parking-svgrepo-com.svg'
import Ruler from '../assets/svg/ruler-svgrepo-com.svg'

function ListingItem({listing , id , onEdit ,onDelete}) {
  return (
    <>
    <li className='categoryListing tr'>
      <Link to={`/house-marketplace/category/${listing.type}/${id}`}
      className='categoryListingLink'>
        <img 
        src={listing.imageUrls[0]} 
        alt={listing.name}
        className='categoryListingImg'/>
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>
            {listing.location}
          </p>
          <p className='categoryListingName'>
            {listing.name}
          </p>
          <p 
          className='categoryListingPrice'>
            {listing.offer 
             ? listing.discountedPrice.toString()
             .replace(/\B(?=(\d{3})+(?!\d))/g,',')
             :listing.regularPrice
             .replace(/\B(?=(\d{3})+(?!\d))/g,',')} 
             {listing.type ==='rent'&&' در ماه'}
          </p>
          <div className="categoryListingInfoDiv">
            {/*<img src={Ruler} alt="ruler"  width={'20px'} height={'33.38'} />*/}
             <p 
            className='listingType2'>
              {listing.Meterage} متر</p>
            {/*<img src={bedIcon} alt="Bed" />*/}
            <p 
            className='listingType2'>
              {listing.bedroom} خوابه
            </p>
            {/*<img src={Parking} alt="parking"  width={'20px'} height={'33.38'} />*/}
            <p 
            className='listingType2'>
              {listing.parking
              ? 'پارکینگ دارد'
              : 'بدون پارکینگ'
              }</p>


          </div>
        </div>
      </Link>
      <div className='removeAndEdit'>

      {onDelete && (
        <DeleteIcon 
        className='' 
        fill='rgb(231,76,60)'
        onClick={()=>onDelete(listing.id , listing.name)} 
        />
      )}

      {onEdit&&(<EditIcon className='' onClick={onEdit}/>)}
      </div>
    </li>
    </>
  )
}

export default ListingItem