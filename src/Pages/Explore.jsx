import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../Components/Slider'

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>
      </header>
      <main>
        <Slider/>
        <div className='exploreCategoryHeading'>
          <div className="exploreCategories">
            <Link to='/category/rent'>
              <img className='exploreCategoryImg' src={rentCategoryImage} alt="Rent Category" />
              <p>Place for rent</p>
            </Link>
            <Link to='/category/sale'>
              <img className='exploreCategoryImg' src={sellCategoryImage} alt="Sell Category" />
              <p>Place for sell</p>
            </Link>
          </div>
          <div className="exploreCategories">
          </div>
        </div>
      </main>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>
  )
}

export default Explore