import { useState } from "react";

export default function Auth({ onLogin }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin("gokulyadavdev@gmail.com", password);
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={submit}
        className="bg-slate-900 p-6 w-80 rounded border border-slate-800"
      >
        <h1 className="text-xl text-blue-400 mb-4 text-center">Admin Login</h1>

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-slate-800 rounded"
        />

        <button disabled={loading} className="w-full bg-blue-600 py-2 rounded">
          {loading ? "Checking…" : "Login"}
        </button>
      </form>
    </div>
  );
}
