"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Facebook, Twitter, User,Menu } from "lucide-react";
import { useEffect, useState } from "react";
// import {clearToken } from "./clear-token";

export default function Navbar() {
  
  const { data: session } = useSession(); // Get session data
  const [dynamicBg, setDynamicBg] = useState("bg-custom-red");
  useEffect(() => {
    const updateBg = () => {
      setDynamicBg(window.innerWidth < 576 ? "bg-black" : "bg-custom-red");
    };
    // Run on mount
    updateBg();
    // Attach event listener
    window.addEventListener("resize", updateBg);
    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", updateBg);
  }, []);
  // window.addEventListener("resize", () => {
  //   setdynamicBg(window.innerWidth < 576 ?  "bg-black" : "bg-custom-red" );
  // });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const clearToken = async () => {
    try {
      const response = await fetch("/api/token", { method: "DELETE" });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to clear token");
  
      console.log(data.message); // Success message
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleLogout = async () => {
    await clearToken();
   signOut();
  };

  return (
    <header className="w-100">
      {/* Top Bar */}
      <div className={`${dynamicBg} text-white  px-4`}>
        <div className="container d-flex flex-wrap justify-content-between align-items-center">
          {/* Welcome Text */}
          <div className="d-none d-sm-block  font-size-14">&#x2022; Welcome to Frederick Sedan Service</div>

          {/* Phone Number */}
          <div className="d-flex align-items-center gap-2  font-size-14 py-2">
            <Phone size={16} />
            <span>Call Us Now :</span>
            <a href="tel:301-663-4946" className="text-white text-decoration-none">
              301-663-4946
            </a>
          </div>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">
            {/* Social Media */}
            <div className="d-none d-sm-flex align-items-center gap-3">
              <Link href="#" className="text-white">
                <Facebook size={16} fill="currentColor" stroke="none" />
              </Link>
              <Link href="#" className="text-white">
                <Twitter size={16} fill="currentColor" stroke="none"/>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="d-none d-sm-flex gap-2 ">
              <Link href="/booking" className="btn btn-dark btn-sm rounded-0 p-2 font-size-14">
                BOOK NOW
              </Link>
              
              {session ? (
                 <button onClick={() =>{ handleLogout()}} className="btn btn-dark btn-sm rounded-0 p-2 font-size-14">
                 LOGOUT
               </button>
                 
             ) : ( <><Link href="/signup" className="btn btn-dark btn-sm rounded-0 p-2 font-size-14">
                SIGN UP
              </Link>
              <Link href="/login" className="btn btn-dark btn-sm rounded-0 p-2">
                LOGIN
              </Link></>)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <Link href="/" title="Go to Home" className="navbar-brand flex-grow-1">
            {/* Uncomment and replace with your logo */}
            <Image
              src="/frederick_logo.svg"
              alt="Frederick Sedan Service"
              width={146}
              height={65}
              className="img-fluid"
            />
          </Link>

          {/* Navbar Toggler for Mobile */}
          <button
            className="navbar-toggler bg-black"
            type="button"
            onClick={toggleNav}
          >
            <Menu color="#ffffff"/>
          </button>

          {/* Navbar Links */}
          <div className={` bee-collapse d-lg-flex flex-grow-1 justify-content-between ${isNavOpen ? 'show h-100' : 'h-0'}`}  >
            <ul className="navbar-nav ms-auto gap-3">
              <li className="nav-item">
                <Link href="/"  title="Home" className="nav-link text-dark  font-size-16 hover-opacity-75">
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/fleet"  title="Fleet" className="nav-link text-dark  font-size-16 hover-opacity-75">
                  OUR FLEET
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/services"  title="Services" className="nav-link text-dark  font-size-16 hover-opacity-75">
                  SERVICES/PACKAGES
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/booking"  title="Booking" className="nav-link text-dark  font-size-16 hover-opacity-75">
                  BOOK NOW
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/rates"  title="Rates" className="nav-link text-dark  font-size-16 hover-opacity-75">
                  RATES
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact"  title="Contact" className="nav-link text-dark  font-size-16 hover-opacity-75">
                  CONTACT US
                </Link>
              </li>
            </ul>

            {/* Profile Button */}
            <Link href="/profile"  title="Profile" className="btn btn-outline-black ms-lg-3 px-0 px-lg-2 d-flex align-items-center gap-2">
             <span className="bg-black d-flex justify-content-center align-items-center" style={{width:"36px", height:"30px", borderRadius:"2px"}}> <User size={24} fill="white" stroke="none" /></span>
              <span className="d-inline">PROFILE</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
