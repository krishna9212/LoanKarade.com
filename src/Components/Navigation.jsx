import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSun } from "react-icons/fa"; // Only keep Sun icon for consistency
import logo from "./../assets/MainLogo.png";
import Signup from "./Signup";
import AlertMessage from "./Alert";
import UserProfile from "./UserProfile";

function Navigation() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [ShowUser, setShowUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  // Force light mode always
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setLoading(true);
      setTimeout(() => setLoading(false), 500);
    }
  }, [location.pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
        </div>
      )}
      <nav className="h-[9%] md:h-[10%] fixed z-50 w-full flex items-center justify-between bg-white text-black transition-all duration-300 px-4 md:px-10 shadow-md">
        <div className="flex items-center h-full">
          <Link to="/" className="w-full h-full flex items-center"> 
            <img
              src={logo}
              alt="LoanKarade"
              className="h-[60%] md:h-12 w-auto transition-all duration-300"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6 pt-2">
          {/* Light mode toggle just shows the icon (optional) */}
          

          {!user ? (
            <button
              onClick={() => setShowModal(true)}
              className="border-blue-600 border-[0.2px] duration-700 text-gray-800 px-4 py-[9px] md:py-[7.5px] rounded-md hover:bg-blue-600 hover:text-white transition-all text-sm md:text-base font-medium"
            >
              Sign Up
            </button>
          ) : (
            <button
              className="px-[11px] py-[12px] rounded-md border-[0.4px] border-gray-400 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              onClick={() => setShowUser(true)}
            >
              <i className="fa-solid fa-user"></i>
            </button>
          )}
        </div>
      </nav>

      {ShowUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs z-10 pointer-events-auto">
          <div className="w-min-[95%] md:w-min-[60%] rounded-xl overflow-hidden h-[55%] md:h-[65%] bg-gray-200 relative">
            <UserProfile />
            <button
              onClick={() => setShowUser(false)}
              className="absolute top-4 right-6 text-gray-800 text-3xl font-semibold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-xs z-10 pointer-events-auto">
          <div className="w-[95%] md:w-[60%] rounded-xl overflow-hidden h-[50%] md:h-[76%] bg-white shadow-lg relative">
            <Signup />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-6 text-gray-800 text-3xl font-semibold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {alert && (
        <div className="alert text-lg font-light">
          <AlertMessage message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
        </div>
      )}
    </>
  );
}

export default Navigation;
