import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique ID generation
import Form from "./Components/Form";
import ProfileCard from "./Components/ProfileCard";
import { IoShareSocialSharp } from "react-icons/io5";
import "./App.css";
import Footer from "./components/Footer";

const App = () => {
  const [profileData, setProfileData] = useState(null);
  const [sharedProfile, setSharedProfile] = useState(null);

  useEffect(() => {
    // Check if there's a profile data in the URL hash
    const urlHash = window.location.hash;
    if (urlHash) {
      const profileDataEncoded = urlHash.replace("#/profile/", "");
      const shared = JSON.parse(atob(profileDataEncoded)); // Decode the Base64 string
      setSharedProfile(shared); // Set the shared profile data
    }
  }, []);

  const handleFormSubmit = (data) => {
    const newProfile = { ...data, id: uuidv4() }; // Add unique ID to the new profile
    const encodedProfile = btoa(JSON.stringify(newProfile)); // Encode the profile data
    setProfileData(newProfile); // Set the submitted data
  };

  const handleReset = () => {
    setProfileData(null); // Reset the profile data to show the form again
  };

  // Determine which profile to display (shared or user created)
  const currentProfile = sharedProfile || profileData;

  return <>
    <div className="app-container">
      {currentProfile ? (
        <>
        <ProfileCard
          {...currentProfile} // Use the current profile data
          links={{
            linkedin: currentProfile.linkedIn,
            github: currentProfile.github,
            twitter: currentProfile.twitter,
            instagram: currentProfile.instagram,
            youtube: currentProfile.youtube,
          }}
        />
        {/* Render these elements only if not a shared profile */}
        {!sharedProfile && (
          <>
            <div className="buttons-container">
              <button
                className="share-button"
                onClick={() => {
                  const profileLink = `https://cardconnect.netlify.app#/profile/${btoa(
                    JSON.stringify(currentProfile)
                  )}`;
      
                  // Copy the link to the clipboard
                  navigator.clipboard.writeText(profileLink);
      
                  // Use the native share API if available
                  if (navigator.share) {
                    navigator
                      .share({
                        title: "My Digital Profile Card",
                        text: "Check out my digital profile card!",
                        url: profileLink,
                      })
                      .catch((error) =>
                        console.error("Error sharing the profile:", error)
                      );
                  } else {
                    alert("Link copied to clipboard!");
                  }
                }}
              >
                Share <IoShareSocialSharp className="shr" />
              </button>
      
              <button className="reset-button" onClick={handleReset}>
              Regenerate
            </button>

            </div>
          </>
     
      
          )}
          {/* Always show the Generate Your Profile button on shared link */}
          {sharedProfile && (
            <button
              className="generate-profile-button"
              onClick={() =>
                (window.location.href = "https://cardconnect.netlify.app")
              }
            >
              Generate Your Profile Card Now !
            </button>
          )}
        </>
      ) : (
        <Form onSubmit={handleFormSubmit} />
      )}
    </div>
  
  <Footer/>
  </>
};

export default App;
