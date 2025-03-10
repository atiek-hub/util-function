import React, { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/shadcn-components/ui/button';
import { CalendarPage } from '../Calendar/CalendarPage';
import { Signup } from './Signup';
import { Signin } from './Signin';

const AuthComponent: React.FC = () => {
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
    <div>
      {!session ? (
        <div className='flex'>
          <div>
            <Signup />
          </div>
          <div>
            <Signin />
          </div>
        </div>
      ) : (
        <div>
          <h2>Logged in!</h2>
          <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
          <CalendarPage />
        </div>
      )}
    </div>

  );
};

export default AuthComponent;
