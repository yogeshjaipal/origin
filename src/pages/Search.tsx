import { useState } from "react";
import { Link } from "react-router-dom";
import { Search as SearchIcon, Star } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // This would normally fetch from an API
  const animeList = [
    { id: 1, title: "Demon Slayer", rating: "9.2", image: "photo-1518770660439-4636190af475" },
    { id: 2, title: "One Piece", rating: "9.5", image: "photo-1487058792275-0ad4aaf24ca7" },
    { id: 3, title: "Attack on Titan", rating: "9.8", image: "photo-1485827404703-89b55fcc595e" },
  ];

  return (
    <div className="min-h-screen texture-bg">
      <Navbar />
      
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/20 border-gray-700 focus:border-orange-500"
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {animeList.map((anime) => (
                <Link key={anime.id} to={`/anime/${anime.id}`}>
                  <motion.div 
                    className="anime-card"
                    whileHover={{ y: -5 }}
                  >
                    <img
                      src={`https://source.unsplash.com/${anime.image}`}
                      alt={anime.title}
                      className="w-full aspect-[3/4] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 w-full p-4 z-10">
                      <h3 className="text-lg font-semibold">{anime.title}</h3>
                      <div className="flex items-center gap-1 text-orange-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{anime.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Search;