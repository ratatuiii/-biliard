import { fetchUser } from '@/app/contexts/UserContext'
import { db } from '@/app/firebase';
import { get, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import "./Friend.css"
import Link from 'next/link';
import profileImg from "../../images/profile.png"
import { useUserFriendship } from '@/app/contexts/FriendContext';
import { useProfile } from '../../contexts/ProfileContext';
import { checkRating } from '@/app/components/checkRating'

function Friend({ profileMailUsername, emailUsername1, emailUsername2, friendshipId, status, myProf }) {
    const { fetchImage } = useProfile();
    const [imgUrl, setImgUrl] = useState(null)
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { available,
        incomingFriendships,
        outcomingFriendships,
        activeFriendships,
        sendFriendRequest,
        acceptFriendRequest,
        denyFriendRequest,
        fetchFriends } = useUserFriendship();
    let img = profileImg;
    let emailUsername = profileMailUsername === emailUsername1 ? (emailUsername2) : (emailUsername1)

    const handleDelete = async () => {
        denyFriendRequest(friendshipId);
    };
    const handleAccept = async () => {
        acceptFriendRequest(friendshipId);
    };
    useEffect(() => {
        const fetchProfile = async () => {
            const snapshot = await get(ref(db, `user/${emailUsername}`));
            if (snapshot.exists()) {
                setProfile(snapshot.val());
                if (snapshot.val().emailUsername) {
                    const imageUrl = await fetchImage(snapshot.val().emailUsername);
                    setImgUrl(imageUrl);  // Set the image URL after fetching
                }
            } else {
                setProfile(null);
            }
            setLoading(false);
        };

        if (emailUsername) fetchProfile();
    }, [emailUsername]);

    if (loading) return <div>Loading...</div>;
    return (
        <div className='friend-info'>
            <Link
                className='profile-link'
                href={'/profile/' + emailUsername}>
                <img src={imgUrl ? (imgUrl) : (profileImg.src)} alt="profile" />
                <span>{profile.username}</span>
            </Link>
            <div className="stats-lvl">
                <img src={checkRating(profile.rating).src} alt="lvl" />
                <span>{profile.rating}</span>
            </div>

            {status === 'active' ? (
                <div className="buttons-change">
                    {myProf && (
                    <span onClick={handleDelete}>&times;</span>
                    )}
                </div>
            ) : (null)}
            {status === 'incoming' ? (
                <div className="buttons-change">
                    <span onClick={handleAccept}>Accept</span>
                    <span onClick={handleDelete}>&times;</span>
                </div>
            ) : (null)}
            {status === 'outcoming' ? (
                <div className="buttons-change">
                    <span onClick={handleDelete}>&times;</span>
                </div>
            ) : (null)}




        </div>
    )
}

export default Friend
