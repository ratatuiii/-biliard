"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState } from "react";
import NavbarUser from "../components/NavbarUser";
import { UserAuth } from "../contexts/AuthContext";
import { getUsernameFromEmail, useUser } from "../contexts/UserContext";
import { useRouter } from "next/navigation";
import "./home.css"
import { useProfile } from "../contexts/ProfileContext";
import Loading from "../components/Loading";
import { checkRating } from '../components/checkRating';

function Page() {
    const router = useRouter();
    const { user, googleSignIn, logOut } = UserAuth();
    const { userInfo, initializeUser, updateUsername, updateRating } = useUser();
    const { fetchImage } = useProfile();
    const [imgUrl, setImgUrl] = useState(null)

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (userInfo?.emailUsername) {
                const imageUrl = await fetchImage(userInfo.emailUsername);
                setImgUrl(imageUrl);  // Set the image URL after fetching
            }
        };

        fetchProfileImage();  // Call the async function inside the effect
    }, [userInfo?.emailUsername, fetchImage]);
    // Ініціалізація користувача
    useEffect(() => {
        if (user && !userInfo) {
            const emailUsername = getUsernameFromEmail(user.email);
            initializeUser(emailUsername);
        }
    }, [user, userInfo, initializeUser]);

    if (!userInfo) {
        return (
            <Loading />
        );
    }

    return (
        <div className='main'>
            <NavbarUser />
            <div className="main flex flex-col min-h-screen text-white">

                <div className="flex flex-col items-center justify-center px-6 py-12">
                    {/* User Card */}
                    {userInfo && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-800 rounded-2xl p-6 shadow-xl flex items-center space-x-6 mb-12"
                        >
                            <img
                                src={imgUrl || "/images/profile.jpg"}
                                alt="Profile"
                                className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-green-400">{userInfo.username}</h2>
                                <p className="text-gray-300">Rating: {userInfo.rating}</p>
                            </div>
                            <img
                                src={checkRating(userInfo.rating).src}
                                alt="Rating badge"
                                className="w-12 h-12 ml-4"
                                title="Rating level"
                            />
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-extrabold mb-6 text-green-400"
                    >
                        Ready to Play?
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-lg text-gray-300 max-w-xl mb-10 text-center"
                    >
                        Start a new match, track your progress, and challenge your opponents in real time.
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-3 px-6 rounded-xl shadow-lg"
                        onClick={() => alert("Start Match Coming Soon")}
                    >
                        Start New Match
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default Page;
