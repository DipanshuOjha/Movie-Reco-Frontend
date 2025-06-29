import React, { useState, useEffect } from 'react';
import { recommendationAPI } from '../services/api';
import { Recommendation, UserPreferences, SimilarUser, Movie } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Brain, Users, Film, Star, UserCheck, Target } from 'lucide-react';

const SmartRecommendationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai'>('ai');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [similarUsers, setSimilarUsers] = useState<SimilarUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecommendations();
  }, [activeTab]);

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      setError('');
      const aiData = await recommendationAPI.getAIRecommendations();
      const recs = aiData.recommendations || [];
      setRecommendations(recs);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'ai', label: 'AI (Cohere)', icon: Brain },
  ] as const;

  if (isLoading && activeTab === 'ai') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-lg font-semibold text-gray-700">Generating AI recommendations, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Movie Recommendations</h1>
        <p className="text-gray-600">AI-powered recommendations based on your preferences</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          key="ai"
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-primary-500 text-white`}
        >
          <Brain className="h-4 w-4" />
          AI (Cohere)
        </button>
      </div>
      {isLoading && activeTab === 'ai' ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-lg font-semibold text-gray-700">Generating AI recommendations, please wait...</p>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={error} />
        </div>
      ) : recommendations.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">Recommended Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendations.map((rec, index) => {
              if (typeof rec === 'string') {
                return (
                  <div key={rec + '-' + index} className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="font-bold text-lg mb-2">{rec}</h3>
                  </div>
                );
              }
              if (rec && typeof rec === 'object' && 'title' in rec && typeof rec.title === 'string') {
                const genre = (rec as any).genre;
                const description = (rec as any).description;
                return (
                  <div key={rec.title + '-' + index} className="bg-white rounded-xl shadow-lg p-4">
                    <h3 className="font-bold text-lg mb-2">{rec.title}</h3>
                    {typeof genre === 'string' && genre ? (
                      <p className="text-sm text-gray-600 mb-2">{genre}</p>
                    ) : null}
                    {typeof description === 'string' && description ? (
                      <p className="text-xs text-gray-500 mb-3">{description}</p>
                    ) : null}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations yet</h3>
          <p className="text-gray-600">Rate more movies to get personalized recommendations.</p>
        </div>
      )}
    </div>
  );
};

export default SmartRecommendationsPage; 