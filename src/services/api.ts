import axios from 'axios';
import type { Movie } from '../types';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: async (username: string, email: string, password: string) => {
    const response = await api.post('/api/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },
};

export const moviesAPI = {
  getMovies: async (page = 1, pageSize = 50): Promise<{ movies: Movie[]; total: number }> => {
    const response = await api.get(`/api/movies?page=${page}&pageSize=${pageSize}`);
    return response.data;
  },

  rateMovie: async (movieId: string, score: number) => {
    const response = await api.post('/api/movies/rate', {
      movieId,
      score,
    });
    return response.data;
  },

  // getRecommendations: async (): Promise<{ recommendations: Movie[] }> => {
  //   const response = await api.get('/api/movies/recommendations/hybrid');
  //   return response.data;
  // },

  addMovie: async (movie: Omit<Movie, 'id' | 'userRating'>) => {
    const response = await api.post('/api/movies/add', movie);
    return response.data;
  },

  importFromOmdb: async (title: string) => {
    const response = await api.post('/api/movies/import-from-omdb', { title });
    return response.data;
  },

  searchMovies: async (query: string): Promise<{ movies: Movie[]; total: number }> => {
    const response = await api.get(`/api/movies/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  recentActivity: async (): Promise<{ movie: string; rating: number; date: string }[]> => {
    const response = await api.get('/api/movies/recent-activity');
    return response.data;
  },
};

export const userStatsAPI = {
  getUserStats: async () => {
    const movies = await moviesAPI.getMovies();
    const watched = movies.movies.filter(m => m.userRating !== null);
    const moviesWatched = watched.length;
    const avgRating = watched.length > 0 ? (watched.reduce((sum, m) => sum + (m.userRating || 0), 0) / watched.length).toFixed(1) : '0';
    const genres = Array.from(new Set(watched.map(m => m.genre)));
    return {
      moviesWatched,
      avgRating,
      genresExplored: genres.length,
      favoriteGenre: genres[0] || '',
      lastRated: watched[0]?.title || '',
    };
  },
  getRecentActivity: async () => {
    const movies = await moviesAPI.getMovies();
    const watched = movies.movies.filter(m => m.userRating !== null);
    // Sort by most recently rated if you have that info, else just return the list
    return watched.slice(0, 5).map(m => ({ movie: m.title, rating: m.userRating, date: '' }));
  }
};

export const recommendationAPI = {
  // Get user preferences and behavior analysis
  getUserPreferences: async () => {
    const response = await api.get('/api/movies/recommendations/preferences');
    return response.data;
  },

  // Get content-based recommendations (based on movie features)
  getContentBasedRecommendations: async () => {
    const response = await api.get('/api/movies/recommendations/content-based');
    return response.data;
  },

  // Get collaborative filtering recommendations (based on similar users)
  getCollaborativeRecommendations: async () => {
    const response = await api.get('/api/movies/recommendations/collaborative');
    return response.data;
  },

  // Get hybrid recommendations (combines multiple approaches)
  // getHybridRecommendations: async () => {
  //   const response = await api.get('/api/movies/recommendations/hybrid');
  //   return response.data;
  // },

  // Get similar users
  getSimilarUsers: async () => {
    const response = await api.get('/api/movies/recommendations/similar-users');
    return response.data;
  },

  // Update user preferences
  updatePreferences: async (preferences: any) => {
    const response = await api.post('/api/movies/recommendations/preferences', preferences);
    return response.data;
  },

  // Get recommendation explanations
  getRecommendationExplanation: async (movieId: string) => {
    const response = await api.get(`/api/movies/recommendations/explain/${movieId}`);
    return response.data;
  },

  // Get AI recommendations
  getAIRecommendations: async () => {
    const response = await api.get('/api/movies/recommendations/ai');
    return response.data;
  },
};

export default api;