import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from '../firebase.config';
import ListingItem from './ListingItem';
import { collection  , query , orderBy, limit , where, getDocs} from 'firebase/firestore'


function SearchBox({}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [ listings , setListings ] = useState(null)
  const[searchRes , setSearchRes] =useState([])
  const[showSearchRes , setShowSearchRes] = useState (false)
  const[showNotDound , setShowNotFound] = useState (false)


  useEffect(() => {
    const fetchListings = async ()=>{
        try {
            //Get
            const listingRef = collection(db,'listing')
            //Create
            const q = query(
                listingRef,                
                orderBy('timestamp','desc'),
                limit(10) 
            )
            //Exxcute query
            const querySnap = await getDocs(q)
            const listing = []

            querySnap.forEach((doc) => {
                return listing.push({
                    name: doc.data().name,
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setListings(listing)
            
        } catch (error) {
            console.log(error)
            //toast.error('could not fetch listings')
        }
    }

    fetchListings()
}, []);

  
  const search = ()=>{   

    const map = listings.filter((listing)=>listing.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchRes(map)
    setShowSearchRes(true)
    console.log(searchRes)
    if (map.length <= 0) {
      setShowNotFound(true)
    }
  }

  const onClear = ()=>{
    setSearchRes('')
    setSearchQuery('')
  }

  return (
    <div>
      <div className='rtl'>
        <div className='formButtons' >
          <button 
              className={searchQuery.length < 3 ?'formButton':'formButtonActive'} 
              type="submit" onClick={search}
              disabled={ searchQuery.length < 3? true : false }
              
              >
              جستجو
          </button>
          <input className='formInputAddress' type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value) } placeholder='برای جستجو بنویسید'/>
          {
            searchRes.length > 0 ? 
              <button 
              className='formButton' 
              type="submit" onClick={onClear}
              >
              پاک کردن
              </button>:<></>
          }
      </div>
    </div>
    <br/>
      <div className='gpt3__navbar-menu '>
        { showSearchRes && searchRes.length > 0 ? searchRes.map((listing)=>(
                          
                            <div className='search scale-up-center'>
                            <ListingItem 
                            listing={listing.data} 
                            id={listing.id}
                            key={listing.id} />
                            </div>
                          
                      )) :
                      showNotDound ?
                        <h3>چیزی پیدا نشد</h3>
                      :<></> }     
      </div>
    </div>
  );
}

export default SearchBox;