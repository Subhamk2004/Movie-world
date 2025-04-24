import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GetAllMovies } from "../../apis/movies";
import { setLoading } from "../../redux/loadersSlice";
import { Search, Film, Star, Clock, Heart, X, Calendar, Sparkles } from 'lucide-react';
import { message, Input, Button, Pagination } from 'antd';
import MovieRecommendationModal from './MovieRecommendationModal';
import MovieCard from '../../components/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;
  
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getAllMovies = async () => {
    try {
      dispatch(setLoading(true));
      const response = await GetAllMovies();
      dispatch(setLoading(false));
      
      // Set all movies
      setMovies(response.movies);
      setFilteredMovies(response.movies);
      
      // Set recent movies (top 5 by release date)
      const sortedByDate = [...response.movies].sort((a, b) => 
        new Date(b.releaseDate) - new Date(a.releaseDate)
      );
      setRecentMovies(sortedByDate.slice(0, 5));
      
      // Extract unique genres and languages for filters
      const uniqueGenres = [...new Set(response.movies.map(movie => movie.genre))];
      const uniqueLanguages = [...new Set(response.movies.map(movie => movie.language))];
      setGenres(uniqueGenres);
      setLanguages(uniqueLanguages);
    } catch (error) {
      dispatch(setLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = movies.filter(movie => 
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.language.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
      
      // If no direct matches, generate recommendations based on search term
      if (filtered.length === 0) {
        generateRecommendationsFromSearch(searchTerm);
      } else {
        setRecommendedMovies([]);
      }
    } else {
      setFilteredMovies(movies);
      setRecommendedMovies([]);
    }
    // Reset to first page when search changes
    setCurrentPage(1);
  }, [searchTerm, movies]);

  // Generate recommendations based on search term when no direct matches are found
  const generateRecommendationsFromSearch = (term) => {
    const words = term.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    let possibleGenre = '';
    let possibleLanguage = '';
    
    // Check if search term contains any known genre
    genres.forEach(genre => {
      if (term.toLowerCase().includes(genre.toLowerCase())) {
        possibleGenre = genre;
      }
    });
    
    // Check if search term contains any known language
    languages.forEach(language => {
      if (term.toLowerCase().includes(language.toLowerCase())) {
        possibleLanguage = language;
      }
    });
    
    // Find movies that partially match search terms or related properties
    let recommendations = movies.filter(movie => {
      // Look for partial word matches in movie name
      const nameMatches = words.some(word => 
        movie.name.toLowerCase().includes(word)
      );
      
      // Check genre match
      const genreMatches = possibleGenre && movie.genre === possibleGenre;
      
      // Check language match
      const languageMatches = possibleLanguage && movie.language === possibleLanguage;
      
      return nameMatches || genreMatches || languageMatches;
    });
    
    // If still no recommendations, find movies with same first letter or similar genres
    if (recommendations.length === 0 && term.length > 0) {
      const firstChar = term.charAt(0).toLowerCase();
      recommendations = movies.filter(movie => 
        movie.name.toLowerCase().charAt(0) === firstChar
      );
      
      // Limit to 5 random recommendations if we have more
      if (recommendations.length > 5) {
        recommendations = recommendations.sort(() => 0.5 - Math.random()).slice(0, 5);
      }
    }
    
    // If absolutely nothing found or search term is too vague, 
    // return some random popular movies
    if (recommendations.length === 0) {
      recommendations = [...movies]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
    }
    
    setRecommendedMovies(recommendations.slice(0, 5));
  };

  const handleRecommendationModalOpen = () => {
    setIsRecommendModalOpen(true);
  };

  const handleRecommendationModalClose = () => {
    setIsRecommendModalOpen(false);
  };

  // Calculate paginated movies for "All Movies" section
  const paginatedMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll back to the top of the All Movies section
    document.getElementById('all-movies-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section with Welcome and Search */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome{user ? `, ${user.name}` : ''}</h1>
            <p className="text-gray-300 text-lg">Discover your next favorite movie</p>
          </div>
          
          <div className="relative mb-6">
            <Input 
              placeholder="Search for movies by name, genre, or language" 
              size="large"
              prefix={<Search className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-6 pl-10 rounded-lg w-full"
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchTerm('')}
              >
                <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>
          
          <Button 
            type="primary" 
            size="large"
            icon={<Star className="h-5 w-5 mr-2" />}
            className="bg-purple-600 hover:bg-purple-700 border-none"
            onClick={handleRecommendationModalOpen}
          >
            Get Movie Recommendations
          </Button>
        </div>
      </div>
      
      {/* Search Results Section - Only visible when searching */}
      {searchTerm && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Search className="h-6 w-6 mr-2" />
              <h2 className="text-2xl font-bold">Search Results</h2>
            </div>
            <p className="text-gray-400">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'} found
            </p>
          </div>
          
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredMovies.map(movie => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          ) : recommendedMovies.length > 0 ? (
            <div>
              <div className="bg-blue-900/30 border border-blue-700/30 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <Sparkles className="h-5 w-5 text-blue-400 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-blue-300">
                      We couldn't find exact matches for "<strong>{searchTerm}</strong>", but you might enjoy these recommendations:
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendedMovies.map(movie => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No movies found matching your search.</p>
            </div>
          )}
        </div>
      )}
      
      {/* Recent Movies Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <Clock className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">Recent Releases</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {recentMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
      
      {/* All Movies Section with Pagination */}
      <div id="all-movies-section" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <Film className="h-6 w-6 mr-2" />
          <h2 className="text-2xl font-bold">All Movies</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {paginatedMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
        
        {/* Pagination Component */}
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={movies.length}
            pageSize={moviesPerPage}
            showSizeChanger={false}
            className="custom-pagination bg-white rounded-lg shadow-md"
          />
        </div>
      </div>
      
      {/* Recommendation Modal Component */}
      <MovieRecommendationModal 
        isOpen={isRecommendModalOpen}
        onClose={handleRecommendationModalClose}
        movies={movies}
        genres={genres}
        languages={languages}
      />
    </div>
  );
};

export default Home;