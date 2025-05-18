import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useProfile } from '../../contexts/ProfileContext';

function Edit({ email, profile, changeUsername, notEdit }) {
    const { imageUrl, uploading, fetchImage, pushImage, loadImage } = useProfile();
    const [selectedFile, setSelectedFile] = useState(null);
    const [username, setUsername] = useState(profile.username);
    const [previewUrl, setPreviewUrl] = useState(null);
    useEffect(() => {
        // Fetch the initial profile image when the component mounts
        if (profile.emailUsername) {
            fetchImage(profile.emailUsername);
        }
    }, [profile.emailUsername, fetchImage]);

    const handleSubmit = async () => {
        changeUsername(username);
        // handle username update logic here (e.g., API call)
        console.log('Username submitted:', username);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return alert('No image selected.');

        try {
            const uploadedUrl = await pushImage(selectedFile, profile.emailUsername);
            console.log('Uploaded URL:', uploadedUrl);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="relative w-full h-full text-white p-6 rounded-2xl overflow-auto">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold" onClick={notEdit}>
                &times;
            </button>

            <div className="flex flex-col justify-center h-full space-y-6">
                <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <span className="text-lg font-semibold">{email}</span>
                </div>

                {/* Preview */}
                {previewUrl && (
                    <div className="w-32 h-32 relative rounded-full overflow-hidden border border-gray-700">
                        <Image src={previewUrl} alt="Preview" layout="fill" objectFit="cover" />
                    </div>
                )}

                {/* File Input */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Profile Picture (recomended 1:1, if updating, image will be shown after several time)</span>
                    <div className="space-x-3">
                        <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm text-blue-300 hover:text-blue-500 cursor-grab" />
                        <button
                            type="button"
                            disabled={!selectedFile || uploading}
                            onClick={handleUpload}
                            className="text-sm text-blue-400 hover:text-blue-500 underline cursor-grab"
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl space-y-4 border border-gray-700">
                    <div className="relative z-0 w-full group">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="peer block w-full appearance-none border-0 border-b-2 border-gray-600 bg-transparent px-0 py-2.5 text-lg text-white placeholder-transparent focus:border-blue-500 focus:outline-none focus:ring-0"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="username"
                            className="absolute top-3 left-0 -z-10 origin-[0] scale-100 transform text-gray-400 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-400"
                        >
                            New Username
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 transition-all duration-300 shadow-md"
                    >
                        Update Username
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
