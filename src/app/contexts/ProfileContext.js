'use client'
import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

// 🔐 CONFIGURATION
const GITHUB_TOKEN = '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';
const GITHUB_USERNAME = 'f1rset';
const GITHUB_REPO = 'billiard-images';
const BRANCH = 'main';
const IMAGE_FOLDER = 'images';
const DEFAULT_IMAGE_URL = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/refs/heads/main/profile.jpg`;

export const ProfileProvider = ({ children }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchImage = async (emailUsername, ext = 'jpg') => {
        const url = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/refs/heads/main/images/${emailUsername}.${ext}`;
        try {
            const res = await fetch(url);

            // Check if the response status is OK (200)
            if (!res.ok) {
                throw new Error(`Error fetching image: ${res.status} ${res.statusText}`);
            }
            // Ensure the response contains the expected data
            return url;
        } catch (error) {
            console.log(error.message); // Log the error message

            // Fallback to default image if there's an error
            return DEFAULT_IMAGE_URL;
        }
    };




    const pushImage = async (file, emailUsername) => {
        if (!file || !emailUsername) throw new Error('File and emailUsername are required');

        const ext = file.name.split('.').pop().toLowerCase();
        if (!['png', 'jpg', 'jpeg'].includes(ext)) {
            throw new Error('Only PNG and JPG files are allowed');
        }

        // Force image to be saved as JPG
        const finalExt = 'jpg';
        const filename = `${emailUsername}.${finalExt}`;
        const filePath = `${IMAGE_FOLDER}/${filename}`;
        const finalUrl = await fetchImage(emailUsername, finalExt);

        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onloadend = async () => {
                let base64Content = reader.result.split(',')[1];

                // If the file is PNG, convert it to JPG
                if (ext === 'png') {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        base64Content = canvas.toDataURL('image/jpeg').split(',')[1]; // Convert to JPG base64
                        uploadImage(base64Content);
                    };
                    img.onerror = () => reject(new Error('Image load failed'));
                    img.src = reader.result;
                } else {
                    uploadImage(base64Content);
                }

                async function uploadImage(content) {
                    setUploading(true);
                    let sha = null;
                    try {
                        const res = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filePath}`, {
                            headers: {
                                Authorization: `Bearer ${GITHUB_TOKEN}`,
                                Accept: 'application/vnd.github+json',
                            },
                        });
                        if (res.ok) {
                            const data = await res.json();
                            sha = data.sha;
                        }
                    } catch (err) {
                        console.warn('SHA check failed:', err.message);
                    }

                    const body = {
                        message: `Upload profile image for ${emailUsername}`,
                        content: content,
                        branch: BRANCH,
                        ...(sha && { sha }),
                    };

                    try {
                        const uploadRes = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${filePath}`, {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${GITHUB_TOKEN}`,
                                Accept: 'application/vnd.github+json',
                            },
                            body: JSON.stringify(body),
                        });

                        if (!uploadRes.ok) {
                            const error = await uploadRes.json();
                            throw new Error(error.message || 'Upload failed');
                        }

                        // Force a new fetch by using a timestamp in the query
                        const updatedUrl = `${finalUrl}?v=${new Date().getTime()}`;

                        // Clear cache in GitHub (not directly possible, but ensure a fresh fetch)
                        setImageUrl(updatedUrl); // Set the new URL with query string
                        resolve(updatedUrl);
                    } catch (err) {
                        reject(err);
                    } finally {
                        setUploading(false);
                    }
                }
            };

            reader.onerror = () => {
                fetchImage(emailUsername)
                setUploading(false);
                reject(new Error('File read failed'));
            };

            reader.readAsDataURL(file);
        });
    };



    return (
        <ProfileContext.Provider value={{ imageUrl, uploading, fetchImage, pushImage }}>
            {children}
        </ProfileContext.Provider>
    );
};
