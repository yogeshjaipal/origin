export interface AnimeTitle {
  english: string | null;
  romaji: string | null;
}

export interface AnimeCoverImage {
  extraLarge: string;
}

export interface AnimeMedia {
  id: number;
  title: AnimeTitle;
  description?: string;
  averageScore: number;
  episodes?: number;
  genres?: string[];
  coverImage: AnimeCoverImage;
  bannerImage: string | null;
  season?: string;
  seasonYear?: number;
  status?: string;
  duration?: number;
}

export interface AnimePageResponse {
  data: {
    Page: {
      media: AnimeMedia[];
    };
  };
}

export interface SingleAnimeResponse {
  data: {
    Media: AnimeMedia;
  };
}