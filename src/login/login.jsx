import React, { useState } from "react";
import "./login.css";
import logo from '../img/logo-2.png';

const SignInSignUp = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    return (
        <div
            className={`login-container ${isRightPanelActive ? "login-right-panel-active" : ""}`}
            id="login-container"
        >
            {/* Sign Up Form */}
            <div className="login-form-container login-sign-up-container">
                <form className="login-form" action="#">
                    <h1 className="login-title">Create Account</h1>
                    <div className="login-social-container">

                    </div>
                    <div className="login-input-group">
                        <span className="login-subtitle">or use your email for registration</span>
                        <input type="text" placeholder="Name" className="login-input" />
                        <input type="email" placeholder="Email" className="login-input" />
                        <input type="password" placeholder="Password" className="login-input" />
                    </div>
                    <button className="login-button">Sign Up</button>
                </form>
            </div>

            {/* Sign In Form */}
            <div className="login-form-container login-sign-in-container">
                <form className="login-form" action="#">
                    <h1 className="login-title">Sign in</h1>
                    <div className="login-social-container">
                    </div>
                    <span className="login-subtitle">or use your account</span>
                    <input type="email" placeholder="Email" className="login-input" />
                    <input type="password" placeholder="Password" className="login-input" />
                    <a href="#" className="login-link">Forgot your password?</a>
                    <button className="login-button">Sign In</button>
                </form>
            </div>

            {/* Overlay Section */}
            <div className="login-overlay-container">
                <div className="login-overlay">
                    <div className="login-overlay-panel login-overlay-left">
                        <img src={logo} alt="Logo" className="mb-3 footer-logo" />
                        <h1 className="login-title">Welcome Back!</h1>
                        <p className="login-text">To keep connected with us please login with your personal info</p>
                        <button
                            className="login-button ghost"
                            onClick={() => setIsRightPanelActive(false)}
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="login-overlay-panel login-overlay-right">
                        <img src={logo} alt="Logo" className="mb-3 footer-logo" />
                        <h1 className="login-title">Hello, Friend!</h1>
                        <p className="login-text">Enter your personal details and start journey with us</p>
                        <button
                            className="login-button ghost"
                            onClick={() => setIsRightPanelActive(true)}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInSignUp;
