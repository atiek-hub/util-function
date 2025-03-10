import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { Signin } from "./components/Auth/Signin";
import { Signup } from "./components/Auth/Signup";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabaseClient";
import { CalendarPage } from "./components/Calendar/CalendarPage";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    }
    checkSession()
    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // ローディング中の表示
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={session ? <CalendarPage /> : <Navigate to="/signin" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
