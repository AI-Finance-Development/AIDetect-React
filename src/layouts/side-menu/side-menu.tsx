import React from 'react'
import './side-menu.css'
import { ReactComponent as SVGBank } from '../../assets/svg/bank-svgrepo-com.svg';
import { ReactComponent as SVGBook } from '../../assets/svg/books-svgrepo-com.svg';
import { ReactComponent as SVGCafe } from '../../assets/svg/cafe-coffee-cup-svgrepo-com.svg';
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {

  const navigate = useNavigate();

  return (
    <div className='side-menu-container' >
      <div className='side-option' onClick={() => (navigate("/banks"))}>
        <SVGBank />
        <span>Banks</span>
      </div>
      <div className='side-option' onClick={() => (navigate("/libraries"))}>
        <SVGBook />
        <span>Libraries</span>
      </div>
      <div className='side-option' onClick={() => (navigate("/caffes"))}>
        <SVGCafe />
        <span>Caffes</span>
      </div>
    </div>
  )
}

export default SideMenu