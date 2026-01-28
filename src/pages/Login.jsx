import { useState } from "react";
import { authService } from "../auth/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const nav = useNavigate();

  const submit = () => {
    if (authService.login(u, p)) nav("/");
    else alert("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <input
          className="w-full border p-2"
          placeholder="Username"
          onChange={(e) => setU(e.target.value)}
        />
        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setP(e.target.value)}
        />
        <button onClick={submit} className="w-full bg-black text-white p-2">
          Login
        </button>
      </div>
    </div>
  );
}
