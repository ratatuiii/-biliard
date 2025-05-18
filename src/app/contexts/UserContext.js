'use client'
import { createContext, useContext, useState } from 'react';
import { ref, set, get } from 'firebase/database';
import { db } from '../firebase';

export const fetchAllUsers = async () => {
    const usersRef = ref(db, 'user');
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
        return Object.values(snapshot.val());
    } else {
        return [];
    }
};

const UserContext = createContext(null);
export const getUsernameFromEmail = (email) => {
    return email.split('@')[0].replace(/\./g, "dot");  // Get the part before '@' as username
};
export const fetchUser = async (emailUsername) => {
    const userRef = ref(db, `user/${emailUsername}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
        return (snapshot.val());
    } else {
        console.error("User not found!")
    }
};
export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    const initializeUser = async (emailUsername) => {
        const userRef = ref(db, `user/${emailUsername}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            setUserInfo(snapshot.val());
        } else {
            const newUser = {
                emailUsername,
                username: emailUsername,
                rating: 1000,
            };
            await set(userRef, newUser);
            setUserInfo(newUser);
        }
    };

    const updateUsername = async (newUsername) => {
        if (!userInfo) return;
        const updatedUser = { ...userInfo, username: newUsername };
        await set(ref(db, `user/${userInfo.emailUsername}`), updatedUser);
        setUserInfo(updatedUser);
    };

    const updateRating = async (newRating) => {
        if (!userInfo) return;
        const updatedUser = { ...userInfo, rating: newRating };
        await set(ref(db, `user/${userInfo.emailUsername}`), updatedUser);
        setUserInfo(updatedUser);
    };

    return (
        <UserContext.Provider value={{ userInfo, initializeUser, updateUsername, updateRating }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
