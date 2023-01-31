import { getAuth, updateProfile } from "firebase/auth"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { toast } from "react-toastify";


function Profile() { 
  const [changeDetails, setChangeDetails] = useState(false)
  const navigate = useNavigate();
  const logOut = async () => {
    await auth.signOut();
    navigate("/");
    
  }
  const auth = getAuth(); 
  const [ formData, setFormData  ] = useState({
    name: auth.currentUser?.displayName,
    email:auth.currentUser?.email
  });
  const { name, email } = formData;

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/sign-in");
    }
  }, [ auth.currentUser ]);
  
  const onSubmit = async () => {
    try {
      if (name !== auth.currentUser?.displayName) {
        // update user displayname
        updateProfile(auth.currentUser, { displayName: name })
         // update user in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        updateDoc(docRef, { name });
      }
     
    } catch (error) {
      toast.error("Error Updating Profile");
    }
    toast.success("profile updated sucessfully");
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  return (
    
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader"> My Profile </p>
        <button onClick={logOut} className="logOut">LOGOUT</button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        {/* <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link> */}


      </main>
      </div>
    )
}

export default Profile