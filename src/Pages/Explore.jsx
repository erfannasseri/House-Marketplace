import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../Components/Slider'
import SearchBox from '../Components/SearchBox'
import Listings from '../Components/Listings'
import { useState } from 'react'
import "../Components/PriceRange/PriceRange.css"

function Explore() {


  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [min, setMin] = useState(100);
  const [max, setMax] = useState(35000000000);

  const setStates = ()=>{
    setMaxValue(max)
    setMinValue(min)
  }

  return (
    <div className='explore '>

      <SearchBox/>
      <main>
        {/*<Slider/>*/}
        <div className='exploreCategoryHeading rtl'>

            {/*Start Price Range*/}

                {/*Price Range End*/}

          <div>


          <Listings max = {maxValue} min = {minValue} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Explore