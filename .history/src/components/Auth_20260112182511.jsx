import { useState } from "react";

const DOMAIN = "xbookmarker.app";

function toEmail(userId) {
  return `${userId}@${DOMAIN}`;
}

export default function Auth({ onLogin, onSignup }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const email = toEmail(userId.trim());

      if (isSignup) {
        await onSignup(email, password);
        alert("Account created. You can now log in.");
        setIsSignup(false);
      } else {
        await onLogin(email, password);
      }
    } catch (err) {
      alert(err.message || "Authentication failed");
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
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <input
          type="text"
          placeholder="User ID"
          required
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-3 py-2 mb-3 bg-slate-800 rounded outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 bg-slate-800 rounded outline-none"
        />

        <button
          disabled={loading}
          className="w-full py-2 bg-blue-600 rounded disabled:opacity-50"
        >
          {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          className="mt-4 text-sm text-slate-400 text-center cursor-pointer"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup
            ? "Already have an account? Login"
            : "No account? Create one"}
        </p>
      </form>
    </div>
  );
}
