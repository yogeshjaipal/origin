import { motion } from "framer-motion";
import { Play, Star, Search, TrendingUp, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from 'graphql-request';
import { AnimePageResponse, AnimeMedia } from "@/types/anime";

const TRENDING_ANIME_QUERY = gql`
  query {
    Page(page: 1, perPage: 12) {
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
        description
        genres
        seasonYear
        episodes
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
      return request('https://graphql.anilist.co', TRENDING_ANIME_QUERY);
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-orange-500 to-orange-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 container mx-auto px-6 h-full flex items-center"
        >
          <div className="max-w-2xl space-y-6">
            <h1 className="text-6xl font-bold text-white leading-tight">
              Discover Your Next <span className="text-orange-400">Favorite Anime</span>
            </h1>
            <p className="text-xl text-white/90">
              Stream the latest and greatest anime series in HD quality. Join our community of anime lovers today!
            </p>
            <div className="flex gap-4">
              <Link to="/search">
                <Button className="bg-white text-orange-500 hover:bg-orange-50">
                  <Search className="mr-2 h-4 w-4" /> Browse Anime
                </Button>
              </Link>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <TrendingUp className="mr-2 h-4 w-4" /> Trending Now
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trending Anime Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Trending Now</h2>
            <Link to="/search" className="text-orange-500 hover:text-orange-600 flex items-center gap-2">
              View All <Play className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid place-items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {data?.data?.Page.media.map((anime: AnimeMedia) => (
                <Link key={anime.id} to={`/anime/${anime.id}`}>
                  <motion.div
                    className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={anime.coverImage.extraLarge}
                        alt={anime.title.english || anime.title.romaji || 'Anime'}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                          <div className="flex items-center gap-2 text-orange-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{(anime.averageScore / 10).toFixed(1)}</span>
                          </div>
                          {anime.episodes && (
                            <div className="flex items-center gap-2 text-white/80">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{anime.episodes} Episodes</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {anime.title.english || anime.title.romaji}
                      </h3>
                      {anime.seasonYear && (
                        <div className="flex items-center gap-2 mt-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{anime.seasonYear}</span>
                        </div>
                      )}
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
