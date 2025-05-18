import React, { useEffect, useState } from 'react'
import "./Profile-inside.css"
import Image from 'next/image';
import edit from "../../images/edit.png"
import { checkRating } from '@/app/components/checkRating'
import { useProfile } from '../../contexts/ProfileContext';
import profileImg from "../../images/profile.png"
function Profile({ profile, myProf, handleEdit, addFriend }) {
    const { fetchImage } = useProfile();
    const [imgUrl, setImgUrl] = useState(null)

    useEffect(() => {
        const fetchProfileImage = async () => {
            if (profile.emailUsername) {
                const imageUrl = await fetchImage(profile.emailUsername);
                setImgUrl(imageUrl);  // Set the image URL after fetching
            }
        };

        fetchProfileImage();  // Call the async function inside the effect
    }, [profile.emailUsername, fetchImage]);

    return (
        <div className='prof'>
            <img className='profile-img' src={imgUrl ? (imgUrl) : (profileImg.src)} alt="profileImg" />
            <span className='username'>{profile.username}</span>
            <div className='prof-stats'>
                <img src={checkRating(profile.rating).src} alt="lvl" />
                <span className='rating'>{profile.rating}</span>
            </div>
            {myProf ? (
                <button className='edit-button' onClick={handleEdit}><img src={edit.src} alt="edit" />Edit</button>
            ) : (
                        <button className='edit-button' onClick={addFriend}>Add Friend</button>
            )}


        </div>
    )
}

export default Profile
