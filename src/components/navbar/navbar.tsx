import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div>
      <nav>
        <h2 className="navLogo" onClick={() => navigate("/")}>AIDetect</h2>
        <ul>
          <li><span onClick={() => navigate("/banks")}>Banks</span></li>
          <li><span onClick={() => navigate('/libraries')}>Libraries</span></li>
          <li><span onClick={() => navigate('/caffes')}>Caffes</span></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
