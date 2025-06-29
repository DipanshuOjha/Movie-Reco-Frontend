import React, { useState, useEffect, useRef } from 'react';
import { moviesAPI } from '../services/api';
import { Movie } from '../types';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Search, Filter } from 'lucide-react';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [addMovieForm, setAddMovieForm] = useState({ title: '', genre: '', description: '', releaseDate: '', posterUrl: '' });
  const [importTitle, setImportTitle] = useState('');
  const [addSuccess, setAddSuccess] = useState('');
  const [importSuccess, setImportSuccess] = useState('');
  const [isAddingMovie, setIsAddingMovie] = useState(false);
  const [isImportingMovie, setIsImportingMovie] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [total, setTotal] = useState(0);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    fetchMovies();
  }, [page]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchMovies();
      return;
    }
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        setSearchError('');
        const data = await moviesAPI.searchMovies(searchTerm);
        setMovies(data.movies);
        setTotal(data.total);
        setFilteredMovies(data.movies);
      } catch (err: any) {
        setSearchError(err.response?.data?.error || err.message || 'Failed to search movies');
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter((movie) => movie.genre === selectedGenre));
    }
  }, [movies, selectedGenre]);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const data = await moviesAPI.getMovies(page, pageSize);
      setMovies(data.movies);
      setTotal(data.total);
      setFilteredMovies(data.movies);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Please log in to view movies');
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to fetch movies');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRateMovie = async (movieId: string, score: number) => {
    try {
      await moviesAPI.rateMovie(movieId, score);
      await fetchMovies(); // Refresh movies with updated ratings
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Please log in to rate movies');
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to rate movie');
      }
      throw err;
    }
  };

  const genres = ['All', ...Array.from(new Set(movies.map((movie) => movie.genre)))];

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddSuccess('');
    setError('');
    setIsAddingMovie(true);
    try {
      await moviesAPI.addMovie(addMovieForm);
      setAddSuccess('Movie added successfully!');
      setAddMovieForm({ title: '', genre: '', description: '', releaseDate: '', posterUrl: '' });
      fetchMovies();
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to add movie');
    } finally {
      setIsAddingMovie(false);
    }
  };

  const handleImportMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    setImportSuccess('');
    setError('');
    setIsImportingMovie(true);
    try {
      await moviesAPI.importFromOmdb(importTitle);
      setImportSuccess('Movie imported from OMDb!');
      setImportTitle('');
      fetchMovies();
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Import from OMDb feature is not available yet. Please add movies manually.');
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to import movie');
      }
    } finally {
      setIsImportingMovie(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Movies</h1>
          <p className="text-gray-600">Explore our collection and rate your favorites</p>
        </div>

        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="block w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white/80 backdrop-blur-sm appearance-none min-w-48"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {total} movie{total !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Add Movie Form */}
        <form onSubmit={handleAddMovie} className="mb-4 flex flex-col md:flex-row gap-2 items-center">
          <input type="text" placeholder="Title" value={addMovieForm.title} onChange={e => setAddMovieForm(f => ({ ...f, title: e.target.value }))} className="border p-2 rounded" required disabled={isAddingMovie} />
          <input type="text" placeholder="Genre" value={addMovieForm.genre} onChange={e => setAddMovieForm(f => ({ ...f, genre: e.target.value }))} className="border p-2 rounded" required disabled={isAddingMovie} />
          <input type="text" placeholder="Description" value={addMovieForm.description} onChange={e => setAddMovieForm(f => ({ ...f, description: e.target.value }))} className="border p-2 rounded" disabled={isAddingMovie} />
          <input type="date" placeholder="Release Date" value={addMovieForm.releaseDate} onChange={e => setAddMovieForm(f => ({ ...f, releaseDate: e.target.value }))} className="border p-2 rounded" disabled={isAddingMovie} />
          <input type="text" placeholder="Poster URL" value={addMovieForm.posterUrl} onChange={e => setAddMovieForm(f => ({ ...f, posterUrl: e.target.value }))} className="border p-2 rounded" disabled={isAddingMovie} />
          <button type="submit" disabled={isAddingMovie} className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isAddingMovie ? <LoadingSpinner size="sm" /> : null}
            {isAddingMovie ? 'Adding...' : 'Add Movie'}
          </button>
        </form>
        {addSuccess && <div className="text-green-600 mb-2">{addSuccess}</div>}
        {/* Import from OMDb Form */}
        <form onSubmit={handleImportMovie} className="mb-4 flex flex-col md:flex-row gap-2 items-center">
          <input type="text" placeholder="Import movie by title (OMDb)" value={importTitle} onChange={e => setImportTitle(e.target.value)} className="border p-2 rounded" required disabled={isImportingMovie} />
          <button type="submit" disabled={isImportingMovie} className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isImportingMovie ? <LoadingSpinner size="sm" /> : null}
            {isImportingMovie ? 'Importing...' : 'Import from OMDb'}
          </button>
        </form>
        {importSuccess && <div className="text-green-600 mb-2">{importSuccess}</div>}
        <div className="text-xs text-gray-500 mb-4">
          Note: OMDb import requires API key setup on backend. If unavailable, use manual add above.
        </div>

        {/* Movie List Area */}
        <div className="relative min-h-[120px]">
          {isSearching ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
              <span className="ml-4 text-gray-600">Searching movies...</span>
            </div>
          ) : searchError ? (
            <div className="flex items-center justify-center py-12">
              <ErrorMessage message={searchError} />
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No movies found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filter criteria to find what you're looking for.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={{ ...movie, userRating: movie.userRating || null }}
                  onRate={handleRateMovie}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page} of {Math.ceil(total / pageSize)}</span>
          <button
            onClick={() => setPage((p) => (p < Math.ceil(total / pageSize) ? p + 1 : p))}
            disabled={page >= Math.ceil(total / pageSize)}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;