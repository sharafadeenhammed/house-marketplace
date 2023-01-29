import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Explore from "./pages/Explore";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Offers from "./pages/Offers"
import ForgotPassword from "./pages/ForgotPassword"
import NotFoundPage from "./pages/NotFoundPage"
import NavBar from "./components/NavBar"
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers/>} />
          <Route path="/sign-in" element={<SignIn/>} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <NavBar/>
      </Router>
    </>
  );
}

export default App;
