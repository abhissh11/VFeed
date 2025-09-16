import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Tags from "./pages/Tags";
import Notifications from "./pages/Notifications";

// Layout
import Navbar from "./components/layout/Navbar";

const queryClient = new QueryClient();

function App() {
  const isAuthenticated = !!localStorage.getItem("token"); // simple check (replace with AuthContext later)

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {isAuthenticated && <Navbar />} {/* Navbar only when logged in */}
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Feed />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/tags/:tag" element={<Tags />} />
              <Route path="/notifications" element={<Notifications />} />
            </>
          ) : (
            // Redirect to login if not authenticated
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
