import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
