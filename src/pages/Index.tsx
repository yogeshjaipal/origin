import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from 'graphql-request';
import { AnimePageResponse, AnimeMedia } from "@/types/anime";

const TRENDING_ANIME_QUERY = gql`
  query {
    Page(page: 1, perPage: 3) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
        }
        bannerImage
        averageScore
      }
    }
  }
`;

const Index = () => {
  console.log("Rendering Index page");

  const { data, isLoading } = useQuery<AnimePageResponse>({
    queryKey: ['trending-anime'],
    queryFn: async () => {
      console.log("Fetching trending anime data");
      const response = await request('https://graphql.anilist.co', TRENDING_ANIME_QUERY);
      console.log("Received anime data:", response);
      return response;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black texture-bg">
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
              <h2 className="text-5xl font-bold leading-tight text-white">
                Welcome to <span className="text-orange-500">Origin</span>
              </h2>
              <p className="text-gray-300 text-lg">
                Stream your favorite anime in HD quality with no interruptions.
              </p>
              <Link to="/search">
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
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
              {data?.Page.media[0]?.bannerImage && (
                <img 
                  src={data.Page.media[0].bannerImage}
                  alt="Featured Anime"
                  className="rounded-lg shadow-2xl shadow-orange-500/20"
                />
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trending Anime Grid */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-white">Trending Now</h2>
          {isLoading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data?.Page.media.map((anime: AnimeMedia) => (
                <Link key={anime.id} to={`/anime/${anime.id}`}>
                  <motion.div
                    className="relative overflow-hidden rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ y: -10 }}
                  >
                    <img
                      src={anime.coverImage.extraLarge}
                      alt={anime.title.english || anime.title.romaji || 'Anime'}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-xl font-bold text-white">
                        {anime.title.english || anime.title.romaji}
                      </h3>
                      <div className="flex items-center gap-2 text-orange-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>{(anime.averageScore / 10).toFixed(1)}</span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;