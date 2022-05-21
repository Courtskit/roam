import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import apiCalls from "./api/apiCalls";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CreateListing from "./pages/CreateListing";
import ListingSearch from "./pages/ListingSearch";
import Blog from "./pages/Blog";
import Listing from "./pages/Listing";
import LeaveNoTrace from "./pages/LeaveNoTrace";
import Team from "./pages/Team";
import CampingTips from "./pages/CampingTips";
import Careers from "./pages/Careers";
import Legal from "./pages/Legal";
import ReservationForm from "./components/ReservationForm";
import ReviewForm from "./components/ReviewForm";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AmenityForm from "./components/AmenityForm";
import AddressForm from "./components/AddressForm";
import Account from "./pages/AccountPage/Account";
import EditListing from "./pages/EditListing";

function App() {
  //user State
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    let response = await apiCalls.whoAmI();
    if (response.user) {
      setUser(response.user);
    }
  };

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route
          path="/signup"
          element={<SignUp user={user} setUser={setUser} />}
        />
        <Route
          path="/signin"
          element={<SignIn user={user} setUser={setUser} />}
        />
        <Route path="/listing/new" element={<CreateListing user={user} setUser={setUser} />} />
        <Route
          path="/listing/:listingId/edit"
          element={<EditListing />}
        />
        <Route
          path="/listing/:listingId"
          element={<Listing user={user} setUser={setUser} />}
        />
        <Route path="/listing/search/" element={<ListingSearch user={user} setUser={setUser} />} />
        <Route path="/reviews/new" element={<ReviewForm />} />
        <Route path="/reservations/new" element={<ReservationForm />} />
        <Route path="/amenities/new" element={<AmenityForm />} />
        <Route path="/addresses/new" element={<AddressForm />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/leavenotrace" element={<LeaveNoTrace />} />
        <Route path="/team" element={<Team />} />
        <Route path="/campingtips" element={<CampingTips />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/legal" element={<Legal />} />
        <Route
          path="/account"
          element={<Account user={user} setUser={setUser} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
