import React from 'react'
import Navbar from '../../components/navbar/navbar'
import './home.css'
import { useNavigate } from 'react-router-dom'

const Home23 = () => {

    const navigate = useNavigate();

    return (
        <div className='home-container'>
            <Navbar />
            <div className='cov'>
            <div className="hero-text">
                <h4>AIDetect</h4>
                <h1>HOSGELDINIZ</h1>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                </p>
                <button className="homeBtn" onClick={()=>{navigate("/caffes")}} >Compare</button>
            </div>
            <div >
                    <img
                        alt=""
                        className="kitap"
                        src="https://static.overlay-tech.com/assets/45c47686-889f-487b-9139-95d2b46ea50a.png"
                    />
                    <img
                        alt=""
                        className="banka"
                        src="https://static.overlay-tech.com/assets/28f23ee4-d517-49e0-a40f-41ac038b49d1.png"
                    />
                    <img
                        alt=""
                        className="kafe"
                        src="https://static.overlay-tech.com/assets/1250cb7e-22a5-4206-92cf-1f8043527e3e.png"
                    />
                </div>
            </div>
       
        </div>
    )
}

export default Home23