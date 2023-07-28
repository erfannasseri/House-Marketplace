import React from 'react'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection  , query , orderBy, limit , startAfter, where, getDocs} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import ListingItem from '../Components/ListingItem'
import Spinner from '../Components/Spinner'

function Category() {
    
    const [ listings , setListings ] = useState(null)
    const [ loading , setLoading ] = useState(true)
    const [lastFetchedListing, setLastFetchedListing] = useState(null)
   
    const params = useParams()
    
    useEffect(() => {
        const fetchListings = async ()=>{
            try {
                //Get
                const listingRef = collection(db,'listing')
                //Create
                const q = query(
                    listingRef,
                    where('type','==',params.categoryName),
                    orderBy('timestamp','desc'),
                    limit(10) 
                )
                //Exxcute query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]
                setLastFetchedListing(lastVisible)

                const listing = []

                querySnap.forEach((doc) => {
                    return listing.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                setListings(listing)
                setLoading(false)
            } catch (error) {
                console.log(error)
                toast.error('could not fetch listings')
            }
        }

        fetchListings()
    }, [params.categoryName])
    
     // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listing')

      // Create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
      console.log(error)
    }
  }
  
    return (
    <div className='category'>
        <header>
            <p className='pageHeader'> {params.categoryName==="rent"?"املاک برای اجاره":"املاک برای فروش"}</p>
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
            <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>:<p>No listings for {params.categoryName} </p>}
    </div>
  )
}

export default Category