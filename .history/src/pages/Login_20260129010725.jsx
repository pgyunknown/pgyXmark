import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../auth/firebaseAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async () => {
    try {
      await firebaseAuth.login(email, password);
      nav("/");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-3">
        <input
          className="w-full border p-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={submit} className="w-full bg-black text-white p-2">
          Login
        </button>
      </div>
    </div>
  );
}
