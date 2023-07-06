import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ listing, id, onDelete }) {
  return (
    <>
      <li className="categoryListing">
        <Link
          to={`/categoty/${listing.type}/${id}`}
          className="categoryListingLink"
        >
          <img
            src={
              listing?.imgUrls[0]
                ? listing.imgUrls[0]
                : "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
            }
            alt={listing.name}
            className="categoryListingImg"
          />
          <div className="categoryListingDetalis">
            <p className="categoryListingLocation">{listing.location}</p>
            <p className="categoryListingName">{listing.name}</p>
            <strong>
              <small>{listing?.offer == true && "discount price"}</small>
            </strong>
            <p className="categoryListingPrice">
              $
              {listing?.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              {listing.type === "rent" && " / Month"}
            </p>
            <div className="categoryListingDiv">
              <img src={bedIcon} alt="bed" />
              <p className="categotyListingInfoText">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : "1 Bedroom"}
              </p>
              <img src={bathtubIcon} alt="bath" />
              <p className="categoryListingInfoText">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : "1 Bathroom"}
              </p>
            </div>
          </div>
        </Link>
        {onDelete && (
          <DeleteIcon
            onClick={() => onDelete(id, listing.name)}
            className="removeIcon"
            fill="rgb(231, 76, 68)"
          />
        )}
      </li>
      <br />
      <br />
    </>
  );
}

export default ListingItem;
