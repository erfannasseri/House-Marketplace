import React from 'react'
import { useEffect , useState } from 'react'
import { collection  , query , orderBy, limit , startAfter, where, getDocs} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import ListingItem from '../Components/ListingItem'
import Spinner from '../Components/Spinner'

function Offer() {
    
    const [ listings , setListings ] = useState(null)
    const [ loading , serLoading ] = useState(true)
   
    
    useEffect(() => {
        const fetchListings = async ()=>{
            try {
                //Get
                const listingRef = collection(db,'listing')
                //Create
                const q = query(
                    listingRef,
                    where('offer','==',true),
                    orderBy('timestamp','desc'),
                    limit(10) 
                )
                //Exxcute query
                const querySnap = await getDocs(q)
                const listing = []

                querySnap.forEach((doc) => {
                    return listing.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                setListings(listing)
                serLoading(false)
            } catch (error) {
                console.log(error)
                toast.error('could not fetch listings')
            }
        }

        fetchListings()
    }, []);
  
    return (
    <div className='category'>
        <header>
            <p className='pageHeader'> Offers </p>
        </header>
        {loading ? <Spinner/>:listings && listings.length>0 ?
        <>
            <main>
                    {listings.map((listing)=>(
                        <ListingItem 
                        listing={listing.data} 
                        id={listing.id}
                        key={listing.id} />
                    ))}
            </main>
        </>:<p>No listings for Offers </p>}
    </div>
  )
}

export default Offer