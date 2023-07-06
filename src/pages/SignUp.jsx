import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import eye from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/Oauth";
import ProcessingSpinner from "../components/ProcessingSpinner";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onchange = (e) => {
    setFormData((pervState) => {
      return {
        ...pervState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const auth = await getAuth();
      console.log(auth);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Sometthing Went Wrong With Registration");
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ width: "120%", opacity: "0", transition: "3s" }}
          animate={{ width: "100%", opacity: 1, transition: "3s" }}
          exit={{ width: "0px", opacity: "0", transition: "3s" }}
        >
          <div className="pageContainer">
            <header>
              <p className="pageHeader"> Welcome Back!</p>
            </header>
            <form onSubmit={onSubmit}>
              <input
                onChange={onchange}
                type="text"
                className="nameInput"
                placeholder="Enter Your Name"
                id="name"
                value={name}
              />
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
                <img
                  src={eye}
                  alt="show password"
                  className="showPassword"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
              <Link to="/forgot-password" className="forgotPasswordLink">
                Forgot Password
              </Link>

              {
                <div className="signUpBar">
                  <p className="signUpText">Sign Up</p>
                  {!loading ? (
                    <button type="submit" className="signUpButton">
                      <ArrowRightIcon
                        fill="#ffffff"
                        width="34px"
                        height="34px"
                      />
                    </button>
                  ) : (
                    <ProcessingSpinner
                      imgContStyle={{
                        height: "30px",
                        width: "30px",
                        paddingLeft: "50px",
                        paddingRight: "50px",
                      }}
                    />
                  )}
                </div>
              }

              <Link to="/sign-in" className="registerLink">
                Sign In Instead
              </Link>
            </form>
            <OAuth />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default SignUp;
