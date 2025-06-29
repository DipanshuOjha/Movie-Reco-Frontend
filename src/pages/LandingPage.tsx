import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Star, Users, TrendingUp, Play, ArrowRight, Sparkles, Award, Heart } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Film,
      title: 'Discover Movies',
      description: 'Explore thousands of movies across all genres and find your next favorite film.',
      color: 'text-primary-600',
      bg: 'bg-primary-100',
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Share your thoughts and help others discover great movies through your ratings.',
      color: 'text-accent-600',
      bg: 'bg-accent-100',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with fellow movie enthusiasts and see what others are watching.',
      color: 'text-secondary-600',
      bg: 'bg-secondary-100',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Movies', icon: Film },
    { number: '50K+', label: 'Reviews', icon: Star },
    { number: '25K+', label: 'Users', icon: Users },
    { number: '4.8', label: 'Rating', icon: Award },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Movie Enthusiast',
      content: 'MovieHub has completely changed how I discover new films. The recommendations are spot-on!',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      name: 'Mike Chen',
      role: 'Film Critic',
      content: 'The community here is amazing. I love reading different perspectives on movies I enjoy.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      name: 'Emma Davis',
      role: 'Casual Viewer',
      content: 'Simple, beautiful interface and great movie suggestions. Exactly what I was looking for!',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-accent-50/20">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-neutral-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-xl">
                <Film className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">MovieHub</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-neutral-600 hover:text-primary-600 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Discover Your Next Favorite Movie</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
                Your Personal
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"> Movie </span>
                Discovery Platform
              </h1>
              
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Join thousands of movie lovers in discovering, rating, and sharing incredible films. 
                Get personalized recommendations tailored just for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 shadow-lg hover:shadow-xl animate-glow"
                >
                  Start Exploring
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl animate-float">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: 'The Dark Knight', rating: 5, genre: 'Action', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop' },
                      { title: 'Inception', rating: 5, genre: 'Sci-Fi', image: 'https://images.pexels.com/photos/7991319/pexels-photo-7991319.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop' },
                      { title: 'Interstellar', rating: 4, genre: 'Drama', image: 'https://images.pexels.com/photos/7991321/pexels-photo-7991321.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop' },
                      { title: 'Parasite', rating: 5, genre: 'Thriller', image: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&fit=crop' },
                    ].map((movie, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                        <div className="aspect-[3/4] bg-gradient-to-br from-neutral-200 to-neutral-300 rounded-lg mb-3 overflow-hidden">
                          <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-semibold text-neutral-900 text-sm mb-1">{movie.title}</h3>
                        <p className="text-xs text-neutral-600 mb-2">{movie.genre}</p>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < movie.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-2">{stat.number}</div>
                <div className="text-neutral-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Everything You Need to
              <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"> Discover Movies</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our platform combines powerful discovery tools with a vibrant community to help you find and enjoy the perfect movies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-xl">
                  <Film className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">MovieHub</span>
              </div>
              <p className="text-neutral-400 mb-4 max-w-md">
                Your personal movie discovery platform. Find, rate, and share incredible films with a community of movie enthusiasts.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link to="/movies" className="hover:text-white transition-colors">Browse Movies</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2024 MovieHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;