import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);

  const animeList = [
    { id: 1, title: "Demon Slayer", rating: "9.2", image: "photo-1518770660439-4636190af475" },
    { id: 2, title: "One Piece", rating: "9.5", image: "photo-1487058792275-0ad4aaf24ca7" },
    { id: 3, title: "Attack on Titan", rating: "9.8", image: "photo-1485827404703-89b55fcc595e" },
  ];

  return (
    <div className="min-h-screen texture-bg">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.div 
              className="flex-1 space-y-6"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl font-bold leading-tight">
                Discover Amazing <span className="gradient-text">Anime</span> Series
              </h2>
              <p className="text-gray-400 text-lg">
                Stream your favorite anime in HD quality with no interruptions.
              </p>
              <Link to="/search">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Play className="mr-2" /> Start Watching
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              className="flex-1"
              animate={{ 
                rotateY: [0, 10, 0],
                rotateZ: [0, 5, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img 
                src="https://source.unsplash.com/random/800x600/?anime"
                alt="Anime Hero"
                className="rounded-lg shadow-2xl shadow-orange-500/20"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trending Anime Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {animeList.map((anime) => (
              <Link key={anime.id} to={`/anime/${anime.id}`}>
                <motion.div
                  className="anime-card glass-card"
                  whileHover={{ y: -10 }}
                >
                  <img
                    src={`https://source.unsplash.com/${anime.image}`}
                    alt={anime.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute bottom-0 w-full p-4 z-10">
                    <h3 className="text-xl font-bold">{anime.title}</h3>
                    <div className="flex items-center gap-2 text-orange-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{anime.rating}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;