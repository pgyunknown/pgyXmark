import { useState } from "react";

export default function Auth({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // single admin email (hard bound)
      const email = "pgydev1846058@gmail.com";
      await onLogin(email, password);
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded w-80 border border-slate-800"
      >
        <h1 className="text-xl font-semibold mb-4 text-blue-400 text-center">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="User ID"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-3 py-2 mb-3 bg-slate-800 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 bg-slate-800 rounded"
        />

        <button
          disabled={loading}
          className="w-full py-2 bg-blue-600 rounded disabled:opacity-50"
        >
          {loading ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
}
