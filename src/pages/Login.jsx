import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === "Kyrie" && password === "Kyrie@312") {
      // Store login state in sessionStorage
      sessionStorage.setItem("isAuthenticated", "true");
      navigate("/admin");
    } else {
      setError("Invalid username or password");
      setPassword("");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl mb-4">Admin Login</h1>
          <p className="text-white/50">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-white/50 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/50"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/50 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-white/50"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-white/50 hover:text-white transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
