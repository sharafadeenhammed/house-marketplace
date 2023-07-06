import { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import eye from "../assets/svg/visibilityIcon.svg";
import ProcessingSpinner from "../components/ProcessingSpinner";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
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
      if (email === "" || password === "")
        return toast.error("email and password required");
      const auth = getAuth();
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        setLoading(false);
        navigate("/");
        toast.success("Logged in sucessfully");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Bad Login Credentails");
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

              <div className="signUpBar">
                <p className="signUpText">Sign In</p>
                {!loading ? (
                  <button type="submit" className="signUpButton">
                    <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
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

              <Link to="/sign-up" className="registerLink">
                Sign up Instead
              </Link>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default SignIn;
