import React from "react";
import { Link, Links } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen pt-20 bg-white text-black">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-12 py-16 gap-10">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-4xl font-serif font-semibold leading-snug">
            Share Moments. <br /> Spark Conversations.
          </h2>
          <p className="mt-4 text-gray-600 max-w-lg">
            Connect with friends, follow people you admire, and share your
            thoughts and engage.
          </p>
          <div className="mt-6">
            <Link to="/feed">
              <button className="px-6 py-3 bg-gray-900 cursor-pointer text-white font-semibold rounded-lg hover:bg-gray-800">
                Explore
              </button>
            </Link>
          </div>
        </div>

        {/* Right Content - Grid of Avatars */}
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="bg-red-400 flex justify-center items-center p-6 rounded-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="user1"
              className="w-20 h-20"
            />
          </div>
          <div className="bg-yellow-300 flex justify-center items-center p-6 rounded-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png"
              alt="user2"
              className="w-20 h-20"
            />
          </div>
          <div className="bg-pink-400 flex justify-center items-center p-6 rounded-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png"
              alt="user3"
              className="w-20 h-20"
            />
          </div>
          <div className="bg-purple-400 flex justify-center items-center p-6 rounded-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140061.png"
              alt="user4"
              className="w-20 h-20"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
