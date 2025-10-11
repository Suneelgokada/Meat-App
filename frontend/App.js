import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import Header from "./src/Components/Header";
import UserLogin from "./src/Components/UserLogin";
import Pincode from "./src/Components/Pincode";

import { useState } from "react";

const AppLayout = () => {
 const [pincode, setPincode] = useState(localStorage.getItem("pincode") || "");
  
  const handlePincodeSubmit = (code) => {
    setPincode(code);
    localStorage.setItem("pincode", code);
  };

  return (
    <div>
      {!pincode && <Pincode onSubmit={handlePincodeSubmit} />}

      {pincode && (
        <>
          <Header />
          <UserLogin />
        </>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);
