// src/app/utils/socialMediaIcons.js

import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaGithub,
    FaGitlab,
    FaPinterest,
    FaReddit,
    FaTiktok,
    FaWhatsapp,
    FaSlack,
    FaTwitch,
    FaSpotify,
    FaTelegram,
    FaDiscord,
    FaGlobe
} from "react-icons/fa";

export const socialMediaIcons = {
    'facebook.com': FaFacebook,
    'twitter.com': FaTwitter,
    'x.com': FaTwitter,
    'instagram.com': FaInstagram,
    'linkedin.com': FaLinkedin,
    'youtube.com': FaYoutube,
    'github.com': FaGithub,
    'gitlab.com': FaGitlab,
    'pinterest.com': FaPinterest,
    'reddit.com': FaReddit,
    'tiktok.com': FaTiktok,
    'whatsapp.com': FaWhatsapp,
    'slack.com': FaSlack,
    'twitch.tv': FaTwitch,
    'spotify.com': FaSpotify,
    'telegram.org': FaTelegram,
    'discord.com': FaDiscord,
    'default': FaGlobe
};

export const detectSocialMedia = (url) => {
    if (!url || url === "https://") return null;

    try {
        const domain = new URL(url).hostname.replace('www.', '');

        const specialDomains = {
            'youtube.com': FaYoutube,
            'youtu.be': FaYoutube,
            'tiktok.com': FaTiktok
        };

        for (const [key, IconComponent] of Object.entries(specialDomains)) {
            if (domain.includes(key)) {
                return {
                    platform: key.replace('.com', ''),
                    IconComponent
                };
            }
        }

        for (const [key, IconComponent] of Object.entries(socialMediaIcons)) {
            if (domain.includes(key) && key !== 'default') {
                return {
                    platform: key.replace('.com', ''),
                    IconComponent
                };
            }
        }
    } catch {
        // Geçersiz URL
    }

    return {
        platform: 'website',
        IconComponent: socialMediaIcons.default
    };
};
