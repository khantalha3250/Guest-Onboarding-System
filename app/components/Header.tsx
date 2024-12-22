"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHeaderVisible(false); // Hide header on scroll down
      } else {
        setIsHeaderVisible(true); // Show header on scroll up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`bg-blue-800 bg-opacity-90 shadow-lg py-4 px-6 lg:px-10 fixed top-0 w-full z-50  transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto flex-wrap">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="MOULD TECK Logo"
              width={30} // You can adjust this value
              height={30} // You can adjust this value
              className="object-contain" // Tailwind class will still work for styling
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-l sm:text-xl lg:text-2xl font-extrabold text-black">
              OnBoard Ease
            </h1>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8 text-darkGray">
          <Link href="/" passHref>
            <span className="hover:text-deepBlue text-sm sm:text-base lg:text-lg font-bold transition duration-300 ease-in-out">
              Home
            </span>
          </Link>
          <Link href="/main-admin" passHref>
            <span className="hover:text-deepBlue text-sm sm:text-base lg:text-lg font-bold transition duration-300 ease-in-out">
              Main Admin
            </span>
          </Link>
          <Link href="/guest-admin" passHref>
            <span className="hover:text-deepBlue text-sm sm:text-base lg:text-lg font-bold transition duration-300 ease-in-out">
              Guest Admin
            </span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 bg-lightGray p-4 shadow-md transition-transform duration-300 ease-in-out">
          <Link href="/" passHref>
            <span
              onClick={toggleMenu}
              className="text-darkGray hover:text-deepBlue text-base font-bold transition duration-300"
            >
              Home
            </span>
          </Link>
          <Link href="/about" passHref>
            <span
              onClick={toggleMenu}
              className="text-darkGray hover:text-deepBlue text-base font-bold transition duration-300"
            >
              Main Admin
            </span>
          </Link>
          <Link href="/classes" passHref>
            <span
              onClick={toggleMenu}
              className="text-darkGray hover:text-deepBlue text-base font-bold transition duration-300"
            >
              Guest Admin
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
