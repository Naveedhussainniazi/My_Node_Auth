import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
    <header className="bg-black/90 backdrop-blur-md shadow-md border-b border-green-400/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Title */}
        <h1 className="text-blue-100 font-semibold text-xl tracking-tight">
          My Notes
        </h1>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-blue-100 hover:text-green-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-blue-100 hover:text-green-400 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-blue-100 hover:text-green-400 transition-colors"
          >
            Sign Up
          </Link>
        </nav>

      </div>
    </header>
    <main>
      
    </main>
    </>
  );
};

export default Header;
