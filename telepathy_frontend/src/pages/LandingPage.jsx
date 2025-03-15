import React from "react";
import './LandingPage.css';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/partnerid')
    }

    const handleClick = () => {
        navigate('/signup');
    }

    return(
        <div className="lp-container">
            <div className="lp-head">
                <p>Telepathy</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="lp-form">
                    <p>Email</p>
                    <input type="email"></input>
                </div>
                <div className="lp-form">
                    <p>Password</p>
                    <input type="password"></input>
                </div>
                <div className="login-btn">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="signup-btn">
                <button onClick={handleClick}>Don't have account yet? Sign Up</button>
            </div>
        </div>
    )
}

export default LandingPage;