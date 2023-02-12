import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import {getDoc , setDoc, doc, serverTimestamp} from "firebase/firestore"
import {ReactComponent as GoogleIcon} from "../assets/svg/googleIcon.svg"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
function OAuth() {
  const navigate = useNavigate();
  // const location = useLocation();

  async function googleSignUp() {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      navigate('/');
    } catch (error) {
      toast.error('Could not authorize with Google');
    } 
  }

  return (
    <button style={{
      display: "flex",
      flexDirection: "column",
      flexBasis:"5px",
      margin:"auto",
      alignItems: "center",
      // width: "100%",
      backgroundColor: "transparent",
      cursor:"pointer"
    }} onClick={googleSignUp}>
      <h3 className='forgotPasswordLink' >Sign up with google</h3> <GoogleIcon className='googleButton' height="34px" width="34px" />
    </button>
 
  )
}
export default OAuth