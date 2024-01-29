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
          <li><span onClick={() => navigate("/banks")}>Bankalar</span></li>
          <li><span onClick={() => navigate('/libraries')}>Kütüphaneler</span></li>
          <li><span onClick={() => navigate('/caffes')}>Kafeler</span></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
