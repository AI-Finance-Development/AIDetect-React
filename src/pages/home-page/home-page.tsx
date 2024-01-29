import React from "react";
import "./home-page.css";
import Navbar from "../../components/navbar/navbar";

const HomePage = () => {
    return (
        <div className="container-home">
            <Navbar />
            <section className="hero">
                <div className="hero-text">
                    <h4>AIDetect</h4>
                    <h1>HOSGELDINIZ</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita
                        sit voluptatibus, minus voluptatum ducimus delectus magnam veritatis
                        distinctio blanditiis dolorum et nam, consequatur ad aspernatur sint
                        ipsam ipsa, quam aliquid!
                    </p>
                    <button className="homeBtn">Compare</button>
                </div>
                <div className="home-img">
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
            </section>
        </div>
    );
};

export default HomePage;
