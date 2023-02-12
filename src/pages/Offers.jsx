import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import {
  collection,
  query,
  startAfter,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Offers() {
  const params = useParams();
  const [ listings, setListings ] = useState([]);
  const [ loading, setLoading ] = useState(true)
  const [ fetchFrom, setFetchFrom ] = useState(null);
  
  useEffect(function () {
    fetInitialListings();
  }, [])

  async function fetInitialListings() {
    setLoading(true);
    try {
      // get reference 
      const listingRef = collection(db, "listings");

      // create a  query
      const myQuery = query(
        listingRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        limit(10)
      );

      // execute query
      const queryData = await getDocs(myQuery);
      const fetchedListings = []
      queryData.docs.forEach(doc => {
        fetchedListings.push({
          id: doc.id,
          data: doc.data()
        })
      });

      setListings(fetchedListings);
      const fetchFrom = queryData.docs.length - 1;
      setFetchFrom(fetchFrom);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(`Error fetching ${params.categoryName} listings`);
      setLoading(false);
    }
    
}

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>
      {
        loading ? (
          <Spinner />
        ) : listings.length > 0 ? (
            <>
              <main>
                <ul className="categoryListings">
                  {listings.map(listing => {
                    return (
                      // <h3 key={listing.id}>{ listing.data.name}</h3>
                     <ListingItem key={listing.id} listing={ listing.data } id={ listing.id } />
                   )
                    
                  })}
                </ul>
              </main>
            </>
        ) : <p>There are no current offers </p>
      }
    </div>
  )
}

export default Offers