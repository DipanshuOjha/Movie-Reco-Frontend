import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Film, Star, TrendingUp, Users } from 'lucide-react';
import { userStatsAPI, moviesAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError('');
        const s = await userStatsAPI.getUserStats();
        setStats(s);
        const r = await moviesAPI.recentActivity();
        setRecent(r);
        // const rec = await moviesAPI.getRecommendations();
        // setRecommendations(rec.recommendations || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-64"><LoadingSpinner size="lg" /></div>;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="mt-2 text-neutral-600">
            Ready to discover your next favorite movie?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-primary-100 rounded-lg p-3"><Film className="h-6 w-6 text-primary-600" /></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Movies Watched</p>
                <p className="text-2xl font-bold text-neutral-900">{stats?.moviesWatched}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-lg p-3"><Star className="h-6 w-6 text-yellow-600" /></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Average Rating</p>
                <p className="text-2xl font-bold text-neutral-900">{stats?.avgRating}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-accent-100 rounded-lg p-3"><TrendingUp className="h-6 w-6 text-accent-600" /></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Genres Explored</p>
                <p className="text-2xl font-bold text-neutral-900">{stats?.genresExplored}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="bg-secondary-100 rounded-lg p-3"><Users className="h-6 w-6 text-secondary-600" /></div>
              <div className="ml-4">
                <p className="text-sm font-medium text-neutral-600">Favorite Genre</p>
                <p className="text-2xl font-bold text-neutral-900">{stats?.favoriteGenre || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {/* Removed hybrid recommendations section */}

        {/* Recent Activity */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8 animate-slide-up">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recent.length === 0 ? (
              <p className="text-neutral-600">No recent activity yet.</p>
            ) : recent.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <Film className="h-4 w-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{activity.movie}</p>
                    <p className="text-sm text-neutral-500">{activity.date ? new Date(activity.date).toLocaleString() : ''}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < activity.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;