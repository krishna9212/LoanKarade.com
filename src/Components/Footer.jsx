import React, { useState, useEffect } from 'react';
import logo from "./../assets/MainLogo.png";
import logo2 from "./../assets/Logo2.png";
import { Link } from "react-router-dom";

const Footer = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        const handleStorageChange = () => {
            const newTheme = localStorage.getItem("theme");
            if (newTheme) setTheme(newTheme);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);


  return (
    <footer className="bg-white dark:bg-black text-gray-100 dark:text-gray-300 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <Link to="/" className="w-full h-full flex items-center justify-center md:justify-start">
                            {theme === "light" ? (
                                <img
                                    src={logo}
                                    alt="LoanKarade"
                                    className="h-16  md:h-14 w-auto transition-all duration-300"
                                />
                            ) : (
                                <img
                                    src={logo2}
                                    alt="LoanKarade"
                                    className="h-16 md:h-14 w-auto transition-all duration-300"
                                />
                            )}
                        </Link>

        <div className="flex flex-col md:flex-row gap-14 md:gap-12 text-center md:text-left">
          <FooterSection title="Contacts">
            {/* <ContactInfo label="Phone:" value="+91 98998 82204" link="tel:+91 98998 82204" /> */}
            <ContactInfo label="Email:" value="Support@loankarade.com" link="mailto:Support@loankarade.com" />
            <ContactInfo label="Address:" value="H-146 SECTOR 63 NOIDA UP" link="https://maps.app.goo.gl/ZEnv91xuUGE7FUUs6" />
          </FooterSection>

          <FooterSection title="Follow Us">
            <SocialIcons />
            <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">Stay updated with our latest news</p>
          </FooterSection>
        </div>
      </div>

      <div className="border-t border-gray-300 text-gray-700 dark:text-gray-200 mt-6 pt-4 text-center text-sm ">
        &copy; {new Date().getFullYear()} LoanKarade. All rights reserved.
      </div>
    </footer>
  );
};

const FooterSection = ({ title, children }) => (
  <div className="space-y-2 ">
    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</p>
    <div>{children}</div>
  </div>
);

const ContactInfo = ({ label, value, link }) => (
  <div className="flex gap-2 pt-1 text-gray-600 hover:text-blue-300 items-center justify-start dark:text-gray-300 dark:hover:text-blue-300 transition duration-300">
    <p className="font-medium text-gray-700  dark:text-gray-200">{label}</p>
    <a href={link} className=" whitespace-nowrap text-[0.9rem] ">{value}</a>
  </div>
);

const SocialIcons = () => {
  const socialLinks = {
    // facebook: "https://facebook.com",
    instagram: "https://www.instagram.com/officialloankarade?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
    // linkedin: "https://linkedin.com",
  };

  return (
    <div className="flex justify-center md:justify-start gap-4 mt-2">
      {Object.entries(socialLinks).map(([platform, url]) => (
        <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
          className="p-[0.35rem] rounded-full bg-blue-500 dark:bg-gray-900 hover:bg-blue-600 dark:hover:bg-gray-950 transition-transform transform hover:scale-110">
          <SocialIcon platform={platform} />
        </a>
      ))}
    </div>
  );
};

const SocialIcon = ({ platform }) => {
  const icons = {
    // facebook: "M22,0H2C0.9,0,0,0.9,0,2v20c0,1.1,0.9,2,2,2h11v-9h-3v-4h3V8.4c0-3.1,1.9-4.8,4.7-4.8c1.3,0,2.5,0.1,2.8,0.1v3.2l-1.9,0c-1.5,0-1.8,0.7-1.8,1.8V11h4.4l-1,4h-3.4v9H22c1.1,0,2-0.9,2-2V2C24,0.9,23.1,0,22,0z",
    instagram: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.7.7.7.4 1.3.9 1.7 1.7.4.7.6 1.5.7 2.7.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.7 2.7-.4.7-.9 1.3-1.7 1.7-.7.4-1.5.6-2.7.7-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.7-.7-.7-.4-1.3-.9-1.7-1.7-.4-.7-.6-1.5-.7-2.7-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-2 .7-2.7.4-.7.9-1.3 1.7-1.7.7-.4 1.5-.6 2.7-.7 1.3-.1 1.7-.1 4.9-.1zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.8.5-1.1 1.1-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.5.8 1.1 1.1.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.8-.5 1.1-1.1.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.5-.8-1.1-1.1-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1zm0 4.2a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1.8a3.7 3.7 0 100 7.4 3.7 3.7 0 000-7.4zm6.8-2.4a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6z",
    // linkedin: "M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm13.5 10.3h-3v-4.5c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4v4.6h-3v-9h2.9v1.2h.1c.4-.7 1.3-1.5 2.6-1.5 2.8 0 3.4 1.8 3.4 4.1v5.2z"
  };

  return (
    <svg className="h-6 w-6   text-gray-100" viewBox="0 0 24 24" fill="currentColor">
      <path d={icons[platform]} />
    </svg>
  );
};

export default Footer;
