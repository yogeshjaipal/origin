import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-white/5 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-orange-500">Origin</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-white hover:text-orange-500 transition-colors">Home</Link>
          <Link to="/search" className="text-white hover:text-orange-500 transition-colors">Browse</Link>
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Button 
          variant="ghost" 
          className="md:hidden text-white hover:text-orange-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white/10 backdrop-blur-lg md:hidden">
            <div className="flex flex-col p-4 gap-4">
              <Link 
                to="/" 
                className="text-white hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                className="text-white hover:text-orange-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;