import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/shadcn-components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div className="fixed w-full z-10">
        <header className="bg-gray-900 py-4 px-6 md:px-8">
          <div className="flex items-center gap-4 justify-between">
            <Link to="/" className="text-white font-bold text-lg">
              Utilty Function
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Button
                variant="ghost"
                asChild
                className="text-gray-400 hover:text-white"
              >
                <Link to="/">ホーム</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                asChild
              >
                <Link to="/stopwatch">ストップウォッチ</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                asChild
              >
                <Link to="/timer">タイマー</Link>
              </Button>
              <Button
                variant="ghost"
                className="text-gray-400 hover:text-white"
                asChild
              >
                <Link to="/calendar">カレンダー</Link>
              </Button>
            </nav>
            <nav className="hidden md:flex items-center gap-4">
              <Button
                className="text-gray-400 hover:text-white"
                onClick={() => supabase.auth.signOut()}
              >
                Signout
              </Button>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};
