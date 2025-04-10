import { useEffect, useState } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import { UserSidebar } from "./components/layouts/UserSidebar";
import { ProviderSidebar } from "./components/layouts/ProviderSidebar";
import { UserProfile } from "./components/user/UserProfile";
import { Login } from "./components/common/Login";
import { Signup } from "./components/common/Signup";
import PrivateRoutes from "./hooks/PrivateRoutes";
import { AddParking } from "./components/parkingprovider/Addparking";
import { ViewMyParking } from "./components/parkingprovider/ViewMyParking";
import LandingPage from "./components/common/LandingPage";
import { UpdateMyParking } from "./components/parkingprovider/UpdateMyParking";
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { AddMyVehicle } from "./components/user/AddMyVehicle";
import { BookMyVehicle } from "./components/user/BookMyVehicle";
import { ViewMyBooking } from "./components/user/ViewMyBooking";
import { ResetPassword } from "./components/common/ResetPassword";
import {ForgotPassword}  from "./components/common/ForgotPassword";
import { UpdateMyBooking } from "./components/user/UpdateMyBooking";
import { Contact } from "./components/common/Contact";
import { Home } from "./components/common/Home";
import { SearchParking } from "./components/user/SearchParking";
import { AddVehicle } from "./components/user/AddVehicle";
import { FinalBooking } from "./components/user/FinalBooking";
import { ViewBookedParking } from "./components/parkingprovider/ViewBookedParking";
import { AgencySidebar } from "./components/layouts/AgencySidebar";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import UsersDetail from "./components/admin/UsersDetail";
import ViewAllBooking from "./components/admin/ViewAllBooking";
import ViewAllParking from "./components/admin/ViewAllParking";
import { AboutUs } from "./components/common/AboutUs";



function App() {
  axios.defaults.baseURL = "http://localhost:3000";

  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      document.body.className = "";
    } else {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);

  return (
    <div className="app-wrapper">
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />  
        <Route path="aboutus" element={<AboutUs/>}></Route>
        <Route path="forgotpassword" element={<ForgotPassword/>}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword/>}></Route>
        <Route path="contact" element={<Contact/>}></Route>
        <Route path="home" element={<Home/>}></Route>
        <Route element={<PrivateRoutes />}>
           <Route path="/admin" element={<AgencySidebar/>}>
           <Route path="admindeshboard" element={<AdminDashboard/>}></Route>
           <Route path="userdetail" element={<UsersDetail/>}></Route>
           <Route path="viewallbooking" element={<ViewAllBooking/>}></Route>
           <Route path="viewallparking" element={<ViewAllParking/>}></Route>
           </Route>
            <Route path="/user" element={<UserSidebar />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path= "addvehicle" element={<AddMyVehicle/>}></Route>
              <Route path= "bookmyvehicle" element={<BookMyVehicle/>}></Route>
              <Route path="viewmybooking" element={<ViewMyBooking/>}></Route>
              <Route path= "updateBooking/:id" element={<UpdateMyBooking/>}></Route>
              <Route path="searchparking" element={<SearchParking/>}></Route>
              <Route path="addvehicle/:parkingId" element={<AddVehicle/>}></Route>
              <Route path="finalbooking/:parkingId" element={<FinalBooking/>}></Route>
            </Route>
            <Route path="/parkingowner" element={<ProviderSidebar />}/>
               <Route path="/parkingowner/addparking" element={<AddParking />} />
               <Route path="/parkingowner/myparking" element={<ViewMyParking />} />
              <Route path="/updateParking/:id" element={<UpdateMyParking />} />
              <Route path="/parkingowner/viewbookedparking" element={<ViewBookedParking/>}></Route>
             
        </Route>
      </Routes>
    </div>
  );
}

export default App;
