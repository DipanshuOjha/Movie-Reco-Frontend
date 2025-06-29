export interface Movie {
  id: string;
  title: string;
  genre: string;
  description: string;
  releaseDate: string;
  posterUrl?: string;
  userRating?: number | null;
  // Enhanced movie attributes for better recommendations
  director?: string;
  cast?: string[];
  year?: number;
  rating?: number;
  runtime?: number;
  language?: string;
  country?: string;
  awards?: string[];
  tags?: string[];
  similarMovies?: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}

// New types for enhanced recommendation system
export interface UserPreferences {
  favoriteGenres: string[];
  favoriteDirectors: string[];
  favoriteActors: string[];
  preferredYears: number[];
  preferredRuntime: number[];
  ratingThreshold: number;
  watchHistory: string[];
  dislikedGenres: string[];
  preferredLanguages: string[];
}

export interface Recommendation {
  movie: Movie;
  score: number;
  reason: string;
  algorithm: 'content-based' | 'collaborative' | 'hybrid' | 'genre-based';
  confidence: number;
}

export interface SimilarUser {
  id: string;
  username: string;
  similarity: number;
  commonMovies: string[];
  recommendedMovies: string[];
}

export interface RecommendationExplanation {
  movieId: string;
  reasons: string[];
  similarMovies: string[];
  userPreferences: string[];
  algorithm: string;
  confidence: number;
}

export interface MovieRecommendationResponse {
  recommendations: Recommendation[];
  userPreferences: UserPreferences;
  similarUsers: SimilarUser[];
  explanation?: RecommendationExplanation;
}