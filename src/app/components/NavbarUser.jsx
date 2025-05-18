'use client'
import { UserAuth } from '@/app/contexts/AuthContext';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import "./NavbarUser.css"
import { fetchAllUsers, getUsernameFromEmail, useUser } from '../contexts/UserContext';
import play from "../images/play.png"
import profile from "../images/profile.png"
import logout from "../images/logout.png"
import searchIcon from "../images/search.png"
import { useProfile } from '../contexts/ProfileContext';
import { checkRating } from './checkRating';
import { useRouter } from 'next/navigation';



function NavbarUser() {
    const router = useRouter
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const toggleSearch = () => setShowSearch(prev => !prev);
    const {imageUrl, uploading, fetchImage, pushImage} = useProfile();

    useEffect(() => {
        function handleClickOutside(event) {
            const overlay = document.querySelector(".search-bar-overlay");
            if (overlay && !overlay.contains(event.target)) {
                setIsAnimatingOut(true);
                setTimeout(() => {
                    setShowSearch(false);
                    setIsAnimatingOut(false);
                    setSearchQuery(""); // optional: clear input
                }, 300); // match CSS animation duration
            }
        }

        if (showSearch) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSearch]);



    const { user, googleSignIn, logOut } = UserAuth();
    const { userInfo, initializeUser, updateUsername, updateRating } = useUser();
    const handleLogOut = () => {
        try {
            logOut();
            router.push('/');
        } catch (error) {
            console.log(error);
        };
    }
    useEffect(() => {
        if (user) {
            initializeUser(getUsernameFromEmail(user.email));
        }
    }, [user]);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (searchQuery.trim()) {
                const allUsers = await fetchAllUsers();
                const filtered = allUsers.filter(u =>
                    u.username?.toLowerCase().includes(searchQuery.toLowerCase()) &&
                    u.emailUsername !== userInfo?.emailUsername
                );
                setResults(filtered);
            } else {
                setResults([]);
            }
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);



    return (
        <>
            {showSearch && (
                <div className={`search-bar-overlay ${isAnimatingOut ? 'fade-out' : 'fade-in'}`}>
                    <input
                        className="user-search-input"
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                    {results.length > 0 && (
                        <ul className="user-search-results">
                            {results.map(user => (
                                <li className="result-item" key={user.emailUsername}>
                                    <Link href={`/profile/${user.emailUsername}`}>
                                        <div className='flex'><img src={checkRating(user.rating).src} alt='lvl' />
                                        <span>{user.rating}</span></div>
                                        <span>{user.username}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            <div className='nav-user'>
                <button className="search-toggle-button nav-user-item" onClick={toggleSearch}>
                    <img src={searchIcon.src} alt="search" />
                </button>

                <ul className='nav-user-links'>
                    <li>
                        <Link
                            className='nav-user-item'
                            href={"/home"}
                        >
                            <img src={play.src} alt="play" />
                            <span>Play</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='nav-user-item'
                            href={"/profile/" + userInfo?.emailUsername}
                        >
                            <img src={profile.src} alt="play" />
                            <span>Profile</span>
                        </Link>

                    </li>
                </ul>
                <Link
                    className='logout nav-user-item'
                    onClick={handleLogOut}
                    href="/"
                >
                    <img src={logout.src} alt="play" />
                    <span>Logout</span>
                </Link>
            </div>
        </>
    )
}

export default NavbarUser
