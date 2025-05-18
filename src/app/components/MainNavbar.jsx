import Link from 'next/link'
import React, { useState } from 'react'
import "./MainNavbar.css"
import { useRouter } from 'next/navigation'
import { UserAuth } from '../contexts/AuthContext';
import {HamburgetMenuClose, HamburgetMenuOpen} from "./Icons.jsx"
import { getUsernameFromEmail, useUser } from '../contexts/UserContext';

function MainNavbar() {
    const [click, setClick] = useState(false);
    const router = useRouter();
    const handleClick = () => setClick(!click);
    const { user, googleSignIn, logOut } = UserAuth();
    const { userInfo, initializeUser, updateUsername, updateRating } = useUser();

    const handleAuth = () => {
        try {
            googleSignIn();
            initializeUser(getUsernameFromEmail(user.email));
            router.push('/home')
        } catch (error) {
            console.log(error);
        };
    }
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
                    <Link href="/" className="nav-logo">
                        <span>YEIZ</span>
                        {/* <i className="fas fa-code"></i> */}
                    </Link>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link
                                href="/"
                                activeclassname="active"
                                className="nav-links"
                            // onClick={handleClick}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/about"
                                activeclassname="active"
                                className="nav-links"
                            // onClick={handleClick}
                            >
                                About
                            </Link>
                        </li>
                        <li className="nav-item-acc">
                            <p
                                activeclassname="active"
                                className="nav-links"
                                onClick={handleAuth}
                            >
                                Create Account
                            </p>
                        </li>
                        <li className="nav-item-acc">
                            <p
                                activeclassname="active"
                                className="nav-links"
                                onClick={handleAuth}
                            >
                                Login
                            </p>
                        </li>
                    </ul>
                    <div className="nav-icon" onClick={handleClick}>
                        {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

                        {click ? (
                            <span className="icon">
                                <HamburgetMenuClose />{" "}
                            </span>
                        ) : (
                            <span className="icon">
                                <HamburgetMenuOpen />
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MainNavbar
