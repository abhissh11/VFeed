// src/components/layout/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-around bg-gray-900 text-white p-4">
      <Link to="/">Feed</Link>
      <Link to="/search">Search</Link>
      <Link to="/notifications">Notifications</Link>
      <Link to="/profile/me">Profile</Link>
    </nav>
  );
}
