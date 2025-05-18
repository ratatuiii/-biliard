'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { ref, set, push, onValue, get, remove } from 'firebase/database';
import { db } from '../firebase';
import { useUser } from './UserContext';

const UserFriendshipContext = createContext(null);



export const UserFriendshipProvider = ({ children }) => {
    const [incomingFriendships, setIncomingFriendships] = useState([]);
    const [outcomingFriendships, setOutcomingFriendships] = useState([]);
    const [activeFriendships, setActiveFriendships] = useState([]);
    const [available, setAvailable] = useState(false);

    const fetchFriends = async (emailUsername) => {
        const friendshipRef = ref(db, 'userfriendship');
        const snapshot = await get(friendshipRef);

        if (!snapshot.exists()) {
            setIncomingFriendships([]);
            setOutcomingFriendships([]);
            setActiveFriendships([]);
            setAvailable(true);
            return;
        }

        const data = snapshot.val();
        const parsed = Object.entries(data).map(([id, value]) => ({ id, ...value }));

        const incoming = parsed.filter(
            (f) => f.emailUsername_2 === emailUsername && f.user2_status === 'pending'
        );
        const outcoming = parsed.filter(
            (f) => f.emailUsername_1 === emailUsername && f.user2_status === 'pending'
        );
        const activeF = parsed.filter(
            (f) =>
                (f.emailUsername_1 === emailUsername || f.emailUsername_2 === emailUsername) &&
                f.user2_status === 'active'
        );

        setIncomingFriendships(incoming);
        setOutcomingFriendships(outcoming);
        setActiveFriendships(activeF);
        setAvailable(true);
    };
    // Create friendship request
    const sendFriendRequest = async (emailUsername_1, emailUsername_2) => {
        const friendshipRef = ref(db, 'userfriendship');
        const snapshot = await get(friendshipRef);
    
        // Check if a friendship already exists (in either direction)
        let exists = false;
        if (snapshot.exists()) {
            const friendships = snapshot.val();
            for (let key in friendships) {
                const f = friendships[key];
                const isMatch =
                    (f.emailUsername_1 === emailUsername_1 && f.emailUsername_2 === emailUsername_2) ||
                    (f.emailUsername_1 === emailUsername_2 && f.emailUsername_2 === emailUsername_1);
                if (isMatch) {
                    exists = true;
                    break;
                }
            }
        }
    
        if (exists) {
            alert("Friendship already exists.");
            return;
        }
    
        // If no existing friendship, create a new one
        const newFriendship = {
            emailUsername_1,
            user1_status: 'active',
            emailUsername_2,
            user2_status: 'pending',
        };
        const newRef = push(friendshipRef);
        await set(newRef, newFriendship);
    };
    


    // Accept request (user2 approves)
    const acceptFriendRequest = async (id) => {
        const friendshipRef = ref(db, `userfriendship/${id}`);
        const snapshot = await get(friendshipRef);

        if (snapshot.exists()) {
            const friendship = snapshot.val();
            friendship.user2_status = 'active';
            await set(friendshipRef, friendship);
        }
    };

    // Deny request (user2 rejects) → delete friendship
    const denyFriendRequest = async (id) => {
        console.log(id);
        await remove(ref(db, `userfriendship/${id}`));
    };

    return (
        <UserFriendshipContext.Provider
            value={{
                available,
                incomingFriendships,
                outcomingFriendships,
                activeFriendships,
                sendFriendRequest,
                acceptFriendRequest,
                denyFriendRequest,
                fetchFriends
            }}
        >
            {children}
        </UserFriendshipContext.Provider>
    );
};

export const useUserFriendship = () => useContext(UserFriendshipContext);
