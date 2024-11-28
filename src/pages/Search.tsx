import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from 'graphql-request';
import { Link } from "react-router-dom";
import { Search as SearchIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { AnimePageResponse } from "@/types/anime";

const SEARCH_ANIME_QUERY = gql`
  query ($search: String, $genre: String, $year: Int) {
    Page(page: 1, perPage: 20) {
      media(search: $search, genre: $genre, seasonYear: $year, type: ANIME) {
        id
        title {
          english
          romaji
        }
        coverImage {
          extraLarge
        }
        genres
        seasonYear
        averageScore
      }
    }
  }
`;

const genres = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy", 
  "Horror", "Mystery", "Romance", "Sci-Fi", "Slice of Life"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  console.log("Search page rendered with:", { searchTerm, selectedGenre, selectedYear });

  const { data, isLoading } = useQuery<AnimePageResponse>({
    queryKey: ['search-anime', searchTerm, selectedGenre, selectedYear],
    queryFn: async () => {
      console.log("Fetching anime with filters:", { searchTerm, selectedGenre, selectedYear });
      return request('https://graphql.anilist.co', SEARCH_ANIME_QUERY, {
        search: searchTerm,
        genre: selectedGenre || undefined,
        year: selectedYear ? parseInt(selectedYear) : undefined
      });
    },
    enabled: searchTerm.length > 0 || selectedGenre.length > 0 || selectedYear.length > 0
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-24 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Search Anime</h1>
            
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="Search anime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_genres">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_years">All Years</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid place-items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {data?.data?.Page.media.map((anime: any) => (
                <Link key={anime.id} to={`/anime/${anime.id}`}>
                  <motion.div
                    className="group relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={anime.coverImage.extraLarge}
                        alt={anime.title.english || anime.title.romaji}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-2 text-white/80">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">{anime.genres[0]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {anime.title.english || anime.title.romaji}
                      </h3>
                      {anime.seasonYear && (
                        <p className="text-sm text-gray-600 mt-1">
                          {anime.seasonYear}
                        </p>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;