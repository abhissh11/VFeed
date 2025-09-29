// src/components/Sidebar.jsx
import React, { useState } from "react";
import PostModal from "./PostModal";
import { MoveRight, Pen, PenLine } from "lucide-react";

export default function Sidebar({ onSelectTag }) {
  const [showModal, setShowModal] = useState(false);
  const tags = ["AI", "WebDev", "MERN", "React", "life", "meme", "films"];

  return (
    <>
      <aside className="col-span-3 bg-gray-100 rounded-xl shadow-md p-4 flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2 bg-black cursor-pointer text-white flex gap-2 justify-center items-center rounded-lg hover:bg-blue-700"
          >
            Create Post{" "}
            <span>
              <PenLine />
            </span>
          </button>

          <div>
            <h2 className="font-semibold text-lg mb-2">Tags</h2>
            <ul className="flex flex-col gap-2 text-sm text-gray-700">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => onSelectTag(tag)}
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="group text-base font-semibold px-4 py-2 flex items-center gap-4 justify-center rounded-lg cursor-pointer bg-black hover:bg-gray-800 text-white">
          Visit Profile{" "}
          <MoveRight
            size={24}
            className="group-hover:translate-x-2 transition"
          />
        </button>
      </aside>

      {showModal && <PostModal onClose={() => setShowModal(false)} />}
    </>
  );
}
