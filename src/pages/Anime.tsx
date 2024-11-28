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
    description: "Tanjiro Kamado's peaceful life is shattered when his family is attacked by demons. Follow his journey as he becomes a demon slayer to avenge his family and cure his sister.",
    rating: "9.5",
    episodes: 26,
    genres: ["Action", "Fantasy", "Drama"],
    image: "photo-1582562124811-c09040d0a901",
    screenshots: [
      "photo-1465146344425-f00d5f5c8f07",
      "photo-1518770660439-4636190af475",
      "photo-1487058792275-0ad4aaf24ca7"
    ]
  };

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
            {/* Hero Section */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={`https://source.unsplash.com/${anime.image}`}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold">{anime.title}</h1>
                <div className="flex items-center gap-2 text-orange-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-lg">{anime.rating}</span>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">{anime.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <Link to={`/watch/${id}`}>
                    <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">
                      <Play className="w-4 h-4 mr-2" /> Watch Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Screenshots Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {anime.screenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={`https://source.unsplash.com/${screenshot}`}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Anime;