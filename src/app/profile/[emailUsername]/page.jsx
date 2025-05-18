'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ref, get } from 'firebase/database';
import { db } from '../../firebase';
import { UserAuth } from '@/app/contexts/AuthContext';
import { getUsernameFromEmail, useUser } from '@/app/contexts/UserContext';
import NavbarUser from "../../components/NavbarUser"
import "./profile.css"
import { useUserFriendship } from '@/app/contexts/FriendContext';
import Friend from './Friend';
import Profile from './Profile';
import { useRouter } from 'next/navigation';
import Edit from './Edit';
import Loading from '@/app/components/Loading';
import UserNotFound from '@/app/components/UserNotFound';

export default function ProfilePage() {
    const router = useRouter();
    const { user, googleSignIn, logOut } = UserAuth();
    const { userInfo, initializeUser, updateUsername, updateRating } = useUser();
    const { emailUsername } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [myProf, setMyProf] = useState(false);
    const [edit, setEdit] = useState(false);

    const [activeFr, setactiveFr] = useState(true);
    const [incFr, setincFr] = useState(false);
    const [outFr, setoutFr] = useState(false);
    const { available,
        incomingFriendships,
        outcomingFriendships,
        activeFriendships,
        sendFriendRequest,
        fetchFriends } = useUserFriendship();

    const addFriend = async () => {
        sendFriendRequest(userInfo.emailUsername, profile.emailUsername);
    }

    const handleEdit = async () => {
        setEdit(true);
    }
    const notEdit = async () => {
        setEdit(false);
    }

    const handleUpdateUsername = async (newUsername) => {
        updateUsername(newUsername);
    }

    const setAct = async () => {
        setactiveFr(true);
        setincFr(false);
        setoutFr(false);
    }
    const setOut = async () => {
        setactiveFr(false);
        setincFr(false);
        setoutFr(true);
    }
    const setInc = async () => {
        setactiveFr(false);
        setincFr(true);
        setoutFr(false);
    }


    useEffect(() => {
        if (user) {
            initializeUser(getUsernameFromEmail(user.email));
        }
    }, [user]);

    useEffect(() => {
        const fetchProfile = async () => {
            const snapshot = await get(ref(db, `user/${emailUsername}`));
            if (snapshot.exists()) {
                setProfile(snapshot.val());
            } else {
                setProfile(null);
            }
            setLoading(false);
        };

        if (emailUsername) fetchProfile();
    }, [emailUsername]);

    useEffect(() => {
        if (userInfo && profile) {
            if (userInfo.emailUsername === profile.emailUsername) {
                setMyProf(true);
            } else {
                setMyProf(false);
            }
            fetchFriends(profile.emailUsername);
        }
    }, [userInfo, profile])
    if (loading) return <Loading />;
    if (!profile) return <UserNotFound name = {emailUsername}/>;
    if (!user) return <Loading />;
    return (
        <div className='main'>
            <NavbarUser />
            <div className='profile'>
                <div className="stats">
                    <div className="flip-card-container">
                        <div className={`flip-card-inner ${edit ? "flipped" : ""}`}>
                            <div className="flip-card-front">
                                <Profile
                                    profile={profile}
                                    myProf={myProf}
                                    handleEdit={handleEdit}
                                    addFriend={addFriend}
                                />
                            </div>
                            <div className="flip-card-back">
                                <Edit
                                    email={user.email}
                                    profile={profile}
                                    changeUsername={handleUpdateUsername}
                                    notEdit={notEdit}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="friendlist">
                    <div className="buttons">
                        <button className={activeFr ? ('button-left active') : ('button-left')} onClick={setAct}>Friends</button>
                        {myProf && (<>
                            <button className={outFr ? ('button-mid active') : ('button-mid')} onClick={setOut}>Pending</button>
                            <button className={incFr ? ('button-right active') : ('button-right')} onClick={setInc}>Incoming</button>
                        </>
                        )}
                    </div>
                    <div className="friends">
                        {!available ? (<div>Loading...</div>) : (<div>
                            {activeFr ? (
                                <div>
                                    {activeFriendships.map(friend => (
                                        <Friend
                                            key={friend.emailUsername_2}
                                            profileMailUsername={profile.emailUsername}
                                            emailUsername1={friend.emailUsername_1}
                                            emailUsername2={friend.emailUsername_2}
                                            friendshipId={friend.id}
                                            status='active'
                                            myProf={myProf}
                                        />
                                    ))}
                                </div>
                            ) : (
                                null
                            )}
                            {incFr ? (
                                <div>
                                    {incomingFriendships.map(friend => (
                                        <Friend
                                            key={friend}
                                            profileMailUsername={profile.emailUsername}
                                            emailUsername1={friend.emailUsername_1}
                                            emailUsername2={friend.emailUsername_2}
                                            friendshipId={friend.id}
                                            status='incoming'
                                            myProf={myProf}
                                        />
                                    ))}
                                </div>
                            ) : (
                                null
                            )}
                            {outFr ? (
                                <div>
                                    {outcomingFriendships.map(friend => (
                                        <Friend
                                            key={friend}
                                            profileMailUsername={profile.emailUsername}
                                            emailUsername1={friend.emailUsername_1}
                                            emailUsername2={friend.emailUsername_2}
                                            friendshipId={friend.id}
                                            status='outcoming'
                                            myProf={myProf}
                                        />
                                    ))}
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}