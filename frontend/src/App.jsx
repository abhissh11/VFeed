import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NotificationsPage from "./pages/Notifications";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Protected routes */}
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
