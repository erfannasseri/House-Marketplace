import React from 'react'
import { useEffect , useState } from 'react'
import { collection  , query , orderBy, limit , startAfter, where, getDocs} from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import ListingItem from '../Components/ListingItem'
import Spinner from '../Components/Spinner'

function Listings(props) {
    
    const [ listings , setListings ] = useState(null)
    const [ loading , serLoading ] = useState(true)
    const [ rent , setRent ] = useState(false)
    const [ sale , setSale ] = useState(false)
    const [ sort , setSort ] = useState(false)
    
    const [whereValue , setWhereValue] = useState('')
    let rp = 'regularPrice'

    
    
    const reent = where('type', '==', whereValue)
    const max = where('regularPrice', '<=', props.max)
    const min = where('regularPrice', '>=', props.min)
    {/*props.max===0 || props.min===0 ? orderBy('timestamp','desc') : orderBy('regularPrice','desc'),*/}

    console.log(props.min,props.max)
    useEffect(() => {
        const fetchListings = async ()=>{
            try {
                //Get
                serLoading(true)
                const listingRef = collection(db,'listing')
                //Create
                const q = query(
                    listingRef,
                    
                    sale && reent || rent && reent ,
                    
                    sort ? orderBy('regularPrice','desc') : orderBy('timestamp','desc'),

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
                if (props.max!==0) {
                    setSort(true)
                }else setSort(false)
                setListings(listing)
                serLoading(false)
                
            } catch (error) {
                console.log(error)
                toast.error('could not fetch listings')
                serLoading(false)
            }
        }
        
            console.log('useEffect')

        fetchListings()
    }, [whereValue,props.max]);
  
    const changeRent = ()=>{
        setRent(!rent)
        if (rent===false) {
            setWhereValue("rent")
        }else setWhereValue("")
        setSale(false)
    }
    const changeSale = ()=>{

        setSale(!sale)
        if (sale === false) {
            setWhereValue("sale")
        }else setWhereValue("")
        setRent(false)

    }

      
    return (
        <>


        
    <div className='category'>
        <div className='row'>
            <button className={rent ?'formButtonActive':'formButton'} onClick={changeRent}> اجاره </button>
            <button className={sale ?'formButtonActive':'formButton'} onClick={changeSale}> فروش </button>
            
        </div>
        
        


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
    </>
  )
}

export default Listings