
import { useState } from "react"
import { toast } from "react-toastify"
import {motion, AnimatePresence} from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import {signInWithEmailAndPassword, getAuth } from "firebase/auth"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import eye from "../assets/svg/visibilityIcon.svg"



function SignIn() {


  const [ showPassword, setShowPassword ] = useState(false)
  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onchange = (e) => {
    setFormData(pervState => {
      return {
        ...pervState,
        [e.target.id]: e.target.value,
      }
    })
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      if (userCredentials.user) {
        navigate("/");
      }
    } catch (err) {
      toast.error("Bad Login Credentails !");
    }


  }



  return (
    <>
      <AnimatePresence>
        <motion.div
          initial = {{width:"120%", opacity:"0", transition: "3s"} }
          animate = {{ width: "100%", opacity:1, transition: "3s"}}
          exit = {{width:"0px", opacity:"0", transition: "3s"}}
        >
          <div className="pageContainer">
            <header>
              <p className="pageHeader"> Welcome Back!</p>
            </header>
            <form onSubmit={onSubmit}>
              <input
                onChange={onchange}
                type="email"
                className="emailInput"
                id="email"
                value={email}
                placeholder="Enter email"
              />
              <div className="passwordInputDiv">
                <input
                  onChange={onchange}
                  type={showPassword ? "text" : "password"}
                  className="passwordInput"
                  value={password}
                  id="password"
                  placeholder="Enter Password"
                />
                <img src={eye}
                  alt="show password"
                  className="showPassword"
                  onClick={()=>setShowPassword(prev => !prev)}
                />
              </div>
              <Link to='/forgot-password' className='forgotPasswordLink'>
                Forgot Password
              </Link>

              <div className='signUpBar'>
                <p className='signUpText'>Sign In</p>
                <button type="submit" className='signUpButton'>
                  <ArrowRightIcon fill='#ffffff' width='34px' height='34px' /> 
                </button>
              </div>

              <Link to='/sign-up' className='registerLink'>
              Sign up Instead
            </Link>
            </form>
            </div>
          </motion.div>
        </AnimatePresence>
    </>
  )
}

export default SignIn