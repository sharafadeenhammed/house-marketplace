import { Link } from "react-router-dom"
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg"
import bedIcon from "../assets/svg/bedIcon.svg"
import bathtubIcon from "../assets/svg/bathtubIcon.svg"
function ListingItem({ listing, id }) {
  console.log(listing);
  return (
    <li className="categoryListing">
      <Link  className="categoryListingLink">
        <img src={listing?.imageUrls[ 0 ]} alt={listing.name} className="categoryListingImg" />
        <p>{listing.name}</p>
      </Link>
    </li>
  )
}

export default ListingItem
