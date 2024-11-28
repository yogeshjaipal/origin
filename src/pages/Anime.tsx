import { useParams, Link } from "react-router-dom";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

const Anime = () => {
  const { id } = useParams();

  // This would normally fetch from an API
  const anime = {
    title: "Demon Slayer",
    description: "Tanjiro Kamado's peaceful life is shattered when his family is attacked by demons.",
    rating: "9.5",
    episodes: 26,
    genres: ["Action", "Fantasy", "Drama"],
    image: "photo-1518770660439-4636190af475"
  };

  return (
    <div className="min-h-screen texture-bg">
      <Navbar />
      
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img 
                src={`https://source.unsplash.com/${anime.image}`}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{anime.title}</h1>
              <div className="flex items-center gap-2 text-orange-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="text-lg">{anime.rating}</span>
              </div>
              <p className="text-gray-400">{anime.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm">
                    {genre}
                  </span>
                ))}
              </div>

              <Link to={`/watch/${id}`}>
                <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">
                  <Play className="w-4 h-4 mr-2" /> Watch Now
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Anime;