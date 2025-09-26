import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data.user);
      navigate("/feed");
    },
    onError: (err) => {
      alert(err.response?.data?.error || "Login failed");
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-80 border border-blue-500">
        <h2 className="text-2xl font-bold mb-4">Login to VFeed</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(form);
          }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 cursor-pointer"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 👇 Add this */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
