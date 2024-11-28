import { useParams, Link } from "react-router-dom";
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from 'graphql-request';
import { SingleAnimeResponse } from "@/types/anime";

const ANIME_QUERY = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        english
        romaji
      }
      description
      averageScore
      episodes
      genres
      coverImage {
        extraLarge
      }
      bannerImage
    }
  }
`;

const Anime = () => {
  const { id } = useParams();
  console.log("Rendering Anime page for ID:", id);

  const { data, isLoading } = useQuery<SingleAnimeResponse>({
    queryKey: ['anime', id],
    queryFn: async () => {
      console.log("Fetching anime data for ID:", id);
      return request('https://graphql.anilist.co', ANIME_QUERY, { id: parseInt(id || '0') });
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen texture-bg">
        <Navbar />
        <div className="pt-24 px-6 text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  const anime = data?.data?.Media;

  if (!anime) {
    return (
      <div className="min-h-screen texture-bg">
        <Navbar />
        <div className="pt-24 px-6 text-center text-gray-400">Anime not found</div>
      </div>
    );
  }

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
                  src={anime.coverImage.extraLarge}
                  alt={anime.title.english || anime.title.romaji || 'Anime'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold">{anime.title.english || anime.title.romaji}</h1>
                <div className="flex items-center gap-2 text-orange-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-lg">{(anime.averageScore / 10).toFixed(1)}</span>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed" 
                   dangerouslySetInnerHTML={{ __html: anime.description || '' }} />
                
                <div className="flex flex-wrap gap-2">
                  {anime.genres?.map((genre: string) => (
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

            {/* Banner Image Section */}
            {anime.bannerImage && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Preview</h2>
                <motion.div
                  className="relative aspect-video rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={anime.bannerImage}
                    alt={`Banner for ${anime.title.english || anime.title.romaji}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Anime;
