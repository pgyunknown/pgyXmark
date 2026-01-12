import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get existing session on app load
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user ?? null);
      setLoading(false);
    });

    // Listen to auth state changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login with email (fake) + password
  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  }

  // Signup with email (fake) + password
  async function signUp(email, password) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
  }

  // Logout
  async function signOut() {
    await supabase.auth.signOut();
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
