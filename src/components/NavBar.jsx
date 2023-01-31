import { useNavigate, useLocation } from "react-router-dom"
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <footer className="navbar"> 
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li onClick={function(){navigate("/")}} className="navbarListItem">
            <ExploreIcon fill={location.pathname === "/" ? "#2c2c2c" : "#a9a9a9"} height="36px" width="36px" />
            {/* 647687 */}
            <p className={location.pathname === "/" ? "navbarListItemNameActive" : "navbarListItemName"} >Explore</p>
          </li>
          <li onClick={function(){navigate("/offers")}} className="navbarListItem">
            <OfferIcon fill={location.pathname === "/offers" ? "#2c2c2c" : "#a9a9a9"} height="36px" width="36px" />
            <p className={location.pathname === "/offers" ? "navbarListItemNameActive" : "navbarListItemName"}>Offers</p>
          </li>
          <li onClick={function(){navigate("/profile")}} className="navbarListItem">
            <PersonOutlineIcon fill={location.pathname === "/profile" ? "#2c2c2c" : "#a9a9a9"}  height="36px" width="36px" />
            <p className={location.pathname === "/profile" ? "navbarListItemNameActive" : "navbarListItemName"}>Profile</p>
          </li>
        </ul>
      </nav>
   </footer>
  )
}

export default NavBar
