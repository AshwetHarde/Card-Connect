import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

import '../App.css';

const ProfileCard = ({ name, jobTitle, bio, selectedAvatar, links }) => {
  return (
    <div className="profile-card">
      <img src={selectedAvatar} alt={`${name}'s avatar`} className="avatar-image" />
      <h2>{name}</h2>
      <h4>{jobTitle}</h4>
      <hr/> 
      <p>{bio}</p>
      <div className="social-links">
        {links.linkedin && (
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin size={24} />
          </a>
        )}
        {links.github && (
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub size={24} />
          </a>
        )}
        {links.twitter && (
          <a href={links.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaXTwitter  size={24} />
          </a>
        )}
        {links.instagram && (
          <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram size={24} />
          </a>
        )}
        {links.youtube && (
          <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaYoutube size={24} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
