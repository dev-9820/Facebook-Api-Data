// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user profile and pages
        axios.get('http://localhost:8000/facebook-api.php?action=profile', { withCredentials: true })
            .then(response => {
                if (response.data.loginUrl) {
                    // If loginUrl is returned, redirect the user to Facebook login
                    window.location.href = response.data.loginUrl;
                } else {
                    setProfile(response.data.profile);
                    setPages(response.data.pages);
                }
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
                setError('Failed to load profile. Please try again later.');
            });
    }, []);

    const handlePageSelect = (event) => {
        const pageId = event.target.value;
        const page = pages.find(p => p.id === pageId);
        setSelectedPage(page);
    };

    if (error) {
        return <div className="App-header">{error}</div>;
    }

    if (!profile) {
        return <div className="App-header">Loading profile...</div>;
    }

    return (
        <div className="App-header">
            <div className="inline-flex mb-32">
            <h1>Welcome, {profile.name}</h1>
            <img className="rounded-full translate-x-2 -translate-y-2 shadow-lg shadow-gray-900" src={profile.picture} alt="Profile" />
            </div>
            {pages.length > 0 ? (
                <div className="text-center">
                    <select className=" transition-all bg-blue-400 text-black" onChange={handlePageSelect} defaultValue="">
                        <option value="" disabled>Select a page</option>
                        {pages.map(page => (
                            <option key={page.id} value={page.id}>{page.name}</option>
                        ))}
                    </select>

                    {selectedPage && (
                        <div className="mt-4">
                            <p><strong>Name:</strong> {selectedPage.name}</p>
                            <p><strong>Followers:</strong> {selectedPage.followers || 'Data not available'}</p>
                            <p><strong>Engagement:</strong> {selectedPage.engagement || 'Data not available'}</p>
                            <p><strong>Impressions:</strong> {selectedPage.impressions || 'Data not available'}</p>
                            <p><strong>Reactions:</strong> {selectedPage.reactions || 'Data not available'}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>No pages found for this user.</p>
            )}
        </div>
    );
};

export default Profile;
