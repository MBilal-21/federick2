"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => setShow(false), 400); // Show for 0.2s
  }, []);

  if (!show) return null;

  return (
    <div className="position-fixed top-0 start-0 d-flex justify-content-center align-items-center w-100 vh-100 bg-light" style={{ zIndex: 1000 }}>
        <div className="spinner-grow text-custom-red" role="status">
          <span className="visually-hidden">Loading ...</span>
        </div>
      </div>
  );
}
// <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light">
//   <div className="spinner-border text-danger" role="status">
//     <span className="visually-hidden">Loading...</span>
//   </div>
// </div>
