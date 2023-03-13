import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

function ListingItem({listing , id , onEdit ,onDelete}) {
  return (
    <li className='categoryListing'>
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
            ${listing.offer 
             ? listing.discountedPrice.toString()
             .replace(/\B(?=(\d{3})+(?!\d))/g,',')
             :listing.regularPrice
             .replace(/\B(?=(\d{3})+(?!\d))/g,',')}
             {listing.type ==='rent'&&'/Month'}
          </p>
          <div className="categoryListingInfoDiv">
            <img src={bedIcon} alt="Bed" />
            <p 
            className='categoryListingInfoText'>
              {listing.bedroom>1
              ?`${listing.bedroom} Bedrooms`
              :`${listing.bedroom} Bedroom`}
            </p>
            <img src={bathtubIcon} alt="bath" />
            <p 
            className='categoryListingInfoText'>
              {listing.bath>1
              ?`${listing.bathroom} Bathrooms`
              :`${listing.bathroom} Bathroom`}
            </p>
          </div>
        </div>
      </Link>
      {onDelete && (
        <DeleteIcon 
        className='removeIcon' 
        fill='rgb(231,76,60)'
        onClick={()=>onDelete(listing.id , listing.name)} 
        />
      )}

      {onEdit&&(<EditIcon className='editIcon' onClick={onEdit}/>)}
    </li>
  )
}

export default ListingItem