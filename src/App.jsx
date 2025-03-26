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
        <Route path="/resetpassword/:token" element={<ResetPassword/>}></Route>
        <Route element={<PrivateRoutes />}>
           
            <Route path="/user" element={<UserSidebar />}>
              <Route path="profile" element={<UserProfile />} />
              <Route path= "addvehicle" element={<AddMyVehicle/>}></Route>
              <Route path= "bookmyvehicle" element={<BookMyVehicle/>}></Route>
              <Route path="viewmybooking" element={<ViewMyBooking/>}></Route>
            </Route>
            <Route path="/parkingowner" element={<ProviderSidebar />} />
               <Route path="/parkingowner/addparking" element={<AddParking />} />
               <Route path="/parkingowner/myparking" element={<ViewMyParking />} />
              <Route path="/updateParking/:id" element={<UpdateMyParking />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
