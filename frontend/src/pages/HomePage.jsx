import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-4">
      HomePage
      <Link to="/login">
        <button className="tex-lg font-semibold bg-blue-500 hover:bg-blue-600 cursor-pointer px-6 py-2 rounded-lg text-white">
          Explore
        </button>
      </Link>
    </div>
  );
}
