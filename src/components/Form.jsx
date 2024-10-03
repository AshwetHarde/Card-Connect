import React, { useState, useEffect } from 'react';
import '../App.css';
import { IoMdMale, IoMdFemale } from 'react-icons/io'; // Import icons

const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('male');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarList, setAvatarList] = useState([]);
  const [step, setStep] = useState(1);
  
  // Social media link states
  const [linkedIn, setLinkedIn] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGitHub] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYouTube] = useState('');

  useEffect(() => {
    const loadAvatars = () => {
      const avatarFolder = `/Avatars/${gender}`;
      const numOfAvatars = gender === 'male' ? 60 : 56;
      const avatars = Array.from({ length: numOfAvatars }).map((_, i) => `${avatarFolder}/${i + 1}.png`);
      setAvatarList(avatars);
      setSelectedAvatar(avatars[0]);
    };
    loadAvatars();
  }, [gender]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, jobTitle, bio, gender, selectedAvatar, linkedIn, twitter, github, instagram, youtube });
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
<form className="form-container" onSubmit={handleSubmit}>
  <h2 className='text'>Create Your Professional Identity</h2>

  {step === 1 && (
    <div className='name'>
      <label htmlFor="name">
        Name:
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          placeholder='Enter Your Name'
        />
      </label>
      <button className='next' type="button" onClick={() => {
        if (!name.trim()) {
          alert("Please enter your name before proceeding!");
        } else {
          nextStep();
        }
      }}>Next</button>
    </div>
  )}

  {step === 2 && (
    <div>
      <label className='name' htmlFor="jobTitle">
        Job Title:
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
          autoComplete="organization-title"
          placeholder='Your Job Title'
        />
      </label>
      <div className="button-container">
        <button type="button" onClick={prevStep}>Back</button>
        <button type="button" onClick={() => {
          if (!jobTitle.trim()) {
            alert("Please enter your job title before proceeding!");
          } else {
            nextStep();
          }
        }}>Next</button>
      </div>
    </div>
  )}

  {step === 3 && (
    <div>
      <label className='bio' htmlFor="bio">
        Short Bio:
        <textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => {
            const text = e.target.value;
            setBio(text.slice(0, 150)); // Limit to 150 characters
          }}
          required
          autoComplete="off"
          placeholder='Your Short Bio....'
        />
        <p className='char-limit'>Character Limit: {bio.length} / 150</p>
      </label>
      <div className="button-container">
        <button type="button" onClick={prevStep}>Back</button>
        <button type="button" onClick={() => {
          if (!bio.trim()) {
            alert("Please enter a short bio before proceeding!");
          } else {
            nextStep();
          }
        }}>Next</button>
      </div>
    </div>
  )}


      
      {step === 4 && (
        <div>
          <label htmlFor="gender">Gender:</label>
          <div className="gender-selection">
            <div
              className={`gender-icon ${gender === 'male' ? 'selected' : ''}`}
              onClick={() => setGender('male')}
            >
              <IoMdMale size={50} color={gender === 'male' ? '#007bff' : '#888'} />
            </div>
            <div
              className={`gender-icon ${gender === 'female' ? 'selected' : ''}`}
              onClick={() => setGender('female')}
            >
              <IoMdFemale size={50} color={gender === 'female' ? '#ff1aa0' : '#888'} />
            </div>
          </div>
          <div className="button-container">
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <div className='avcont'>
            <label>
              Choose Avatar:
              <div className="avatar-selection">
                {avatarList.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index + 1}`}
                    className={`avatar ${selectedAvatar === avatar ? 'selected' : ''}`}
                    onClick={() => setSelectedAvatar(avatar)}
                  />
                ))}
              </div>
            </label>
          </div>
          <div className="button-container">
            <button type="button" onClick={prevStep}>Back</button>
            <button type="button" onClick={nextStep}>Next</button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div>
          <label htmlFor="linkedIn">
            LinkedIn Profile:
            <input
              id="linkedIn"
              name="linkedIn"
              type="url"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              placeholder="https://www.linkedin.com/in/your-profile"
              autoComplete="url" // Added autocomplete
            />
          </label>
          <label htmlFor="twitter">
            Twitter Profile:
            <input
              id="twitter"
              name="twitter"
              type="url"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              placeholder="https://twitter.com/your-profile"
              autoComplete="url" // Added autocomplete
            />
          </label>
          <label htmlFor="github">
            GitHub Profile:
            <input
              id="github"
              name="github"
              type="url"
              value={github}
              onChange={(e) => setGitHub(e.target.value)}
              placeholder="https://github.com/your-profile"
              autoComplete="url" // Added autocomplete
            />
          </label>
          <label htmlFor="instagram">
            Instagram Profile:
            <input
              id="instagram"
              name="instagram"
              type="url"
              value={instagram} // New state variable for Instagram
              onChange={(e) => setInstagram(e.target.value)} // New state update for Instagram
              placeholder="https://instagram.com/your-profile"
              autoComplete="url" // Added autocomplete
            />
          </label>

          <label className='soc' htmlFor="youtube">
            YouTube Channel:
            <input
              id="youtube"
              name="youtube"
              type="url"
              value={youtube} // New state variable for YouTube
              onChange={(e) => setYouTube(e.target.value)} // New state update for YouTube
              placeholder="https://youtube.com/your-channel"
              autoComplete="url" // Added autocomplete
            />
          </label>

          <div className='btn'>
            <button type="button" onClick={prevStep}>Back</button>
            <button type="submit">Generate</button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
