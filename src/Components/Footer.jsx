import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "./../assets/MainLogo.png";
import logo2 from "./../assets/Logo2.png";

function Footer() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Update theme dynamically when localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const newTheme = localStorage.getItem("theme");
            if (newTheme) setTheme(newTheme);
        };

        // Add a listener for localStorage changes
        window.addEventListener("storage", handleStorageChange);

        // Cleanup the listener on component unmount
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <footer className="bg-white dark:bg-black md:pt-4">
            <hr className=" border-gray-200  dark:border-gray-700 " />
            <div className="mx-auto w-full md:p-4 py-6 ">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="w-full h-full flex items-center justify-center">
                            {theme === "light" ? (
                                <img
                                    src={logo}
                                    alt="LoanKarade"
                                    className="h-16  md:h-12 w-auto transition-all duration-300"
                                />
                            ) : (
                                <img
                                    src={logo2}
                                    alt="LoanKarade"
                                    className="h-16 md:h-12 w-auto transition-all duration-300"
                                />
                            )}
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
    <div className="text-center md:text-left">
        <h2 className="mb-6 text-sm poppins-semibold text-blue-600  uppercase ">
            Resources
        </h2>
        <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
                <a href="#" className="hover:underline">
                    Loankarade
                </a>
            </li>
            <li>
                <a href="https://tailwindcss.com/" className="hover:underline">
                    Tailwind CSS
                </a>
            </li>
        </ul>
    </div>
    <div className="text-center md:text-left">
        <h2 className="mb-6 text-sm poppins-semibold text-blue-600 uppercase ">
            Follow us
        </h2>
        <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
                <a href="https://github.com/themesberg/flowbite" className="hover:underline">
                    Github
                </a>
            </li>
            <li>
                <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">
                    Discord
                </a>
            </li>
        </ul>
    </div>
    <div className="text-center md:text-left">
        <h2 className="mb-6 text-sm poppins-semibold text-blue-600 uppercase ">
            Legal
        </h2>
        <ul className="text-gray-500 dark:text-gray-400 font-medium">
            <li className="mb-4">
                <a href="#" className="hover:underline">
                    Privacy Policy
                </a>
            </li>
            <li>
                <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                </a>
            </li>
        </ul>
    </div>
</div>

                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex items-center justify-center text-center ">
    <span className="text-sm text-gray-500 dark:text-gray-400">
        © 2025 <a href="#" className="hover:underline">LoanKarade™</a>. All Rights Reserved.
    </span>
    <div className="flex justify-center mt-4 sm:justify-start sm:mt-0">
        {/* Social media icons */}
    </div>
</div>

            </div>
        </footer>
    );
}

export default Footer;
