import React, { useState } from 'react';
import { Star, Calendar, Tag } from 'lucide-react';
import { Movie } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface MovieCardProps {
  movie: Movie & { userRating: number | null };
  onRate: (movieId: string, rating: number) => Promise<void>;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onRate }) => {
  const [selectedRating, setSelectedRating] = useState<number>(movie.userRating || 0);
  const [isRating, setIsRating] = useState(false);

  const handleRating = async () => {
    if (selectedRating === 0) return;
    setIsRating(true);
    try {
      await onRate(movie.id, selectedRating);
    } catch (error) {
      console.error('Rating failed:', error);
    } finally {
      setIsRating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group animate-fade-in">
      <div className="relative h-64 bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
        {movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-primary-400">
              <svg className="h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6h6v12H9V6z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{movie.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(movie.releaseDate)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="h-4 w-4" />
              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                {movie.genre}
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3">{movie.description}</p>
        </div>
        <div className="border-t pt-4">
          {movie.userRating ? (
            <div className="text-center p-3 bg-accent-50 rounded-lg">
              <div className="flex items-center justify-center space-x-1 text-accent-600">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-medium">Rated {movie.userRating}/5</span>
              </div>
              <p className="text-sm text-accent-600 mt-1">Thanks for rating!</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate this movie
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setSelectedRating(rating)}
                      className="p-1 hover:scale-110 transition-transform"
                      disabled={isRating}
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          rating <= selectedRating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 hover:text-yellow-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleRating}
                  disabled={selectedRating === 0 || isRating}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isRating ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      <span>Rating...</span>
                    </div>
                  ) : (
                    <>
                      <Star className="h-4 w-4" />
                      <span>Rate</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;