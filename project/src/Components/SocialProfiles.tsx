import React from 'react';
import { useTranslation } from 'react-i18next';
import { getPrivacyVariable } from '../privacy';
import './SocialProfiles.css';

const SocialProfiles: React.FC = () => {
    const { t } = useTranslation();
    
    const profiles = [
        {
            name: "LinkedIn",
            url: getPrivacyVariable('LINKEDIN_URL'),
            image: "/img/linkedin_logo.svg"
        },
        {
            name: "Upwork",
            url: getPrivacyVariable('UPWORK_URL'),
            image: "/img/upwork_logo.svg"
        },
        {
            name: "Malt",
            url: getPrivacyVariable('MALT_URL'),
            image: "/img/malt_logo.svg"
        }
    ];

    return (
        <div className="social-profiles">
            <h3>{t('SOCIAL_PROFILES_TITLE')}</h3>
            <p className="description">{t('SOCIAL_PROFILES_DESCRIPTION')}</p>
            <div className="profile-cards">
                {profiles.map((profile, index) => (
                    <a 
                        key={index} 
                        href={profile.url} 
                        className="profile-card" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <img src={profile.image} alt={profile.name} />
                        <h4>{profile.name}</h4>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialProfiles;
