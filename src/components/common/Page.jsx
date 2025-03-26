import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./Page.css"; 

const Page = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-wrapper">
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default Page;
