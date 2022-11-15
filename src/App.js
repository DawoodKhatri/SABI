import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NewBooking from "./Components/Customer/NewBooking";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const testDataC = {
    _id: "634308a380d689ea80316a70",
    name: "Dawood Khatri",
    email: "dawoodkhatri18@gmail.com",
    type: "customer"
  };
  const testDataR = {
    _id: "635b83e07a85914ac2da4b88",
    name: "admin",
    email: "dawoodkhatri18@gmail.com",
    type: "restaurant",
    restaurant: null
  };
  const [userData, setData] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home userData={userData} setData={setData} />}
        />
        <Route path="/signup" element={<Signup update={setData} />} />
        <Route path="/login" element={<Login update={setData} />} />
        <Route
          path="/dashboard"
          element={<Dashboard userData={userData} setData={setData} />}
        />
        {userData && userData.type === "customer" && (
          <Route
            path="/dashboard/newbooking"
            element={<NewBooking id={userData._id.toString()} />}
          />
        )}
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}
