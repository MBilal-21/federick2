"use client";
export default function Loading() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-grow text-custom-red" role="status">
          <span className="visually-hidden">Loading ...</span>
        </div>
      </div>
    );
  }
  