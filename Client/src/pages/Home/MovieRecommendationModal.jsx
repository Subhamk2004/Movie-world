import { useState } from 'react';
import { Modal, Button, Select, Input, Rate } from 'antd';
import { Star, Calendar } from 'lucide-react';
import MovieCard from '../../components/MovieCard';

const MovieRecommendationModal = ({ isOpen, onClose, movies, genres, languages }) => {
    const [recommendationFilters, setRecommendationFilters] = useState({
        genre: '',
        language: '',
        releaseYear: '',
        rating: 3
    });
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [appliedFilters, setAppliedFilters] = useState([]);

    // Get year from date
    const getYear = (dateString) => {
        return new Date(dateString).getFullYear();
    };

    // Generate movie recommendations based on filters
    const generateRecommendations = () => {
        // Start with all active filters
        const activeFilters = [];
        
        if (recommendationFilters.genre) activeFilters.push('genre');
        if (recommendationFilters.language) activeFilters.push('language');
        if (recommendationFilters.releaseYear) activeFilters.push('releaseYear');
        
        // Try with all filters first, then progressively remove them
        findRecommendationsWithRelaxation(activeFilters);
    };
    
    // Recursive function to relax filters until we find movies
    const findRecommendationsWithRelaxation = (activeFilters) => {
        let results = [...movies];
        const appliedFiltersList = [];

        // Apply remaining active filters
        if (activeFilters.includes('genre') && recommendationFilters.genre) {
            results = results.filter(movie => 
                movie.genre.toLowerCase() === recommendationFilters.genre.toLowerCase()
            );
            appliedFiltersList.push(`Genre: ${recommendationFilters.genre}`);
        }

        if (activeFilters.includes('language') && recommendationFilters.language) {
            results = results.filter(movie => 
                movie.language.toLowerCase() === recommendationFilters.language.toLowerCase()
            );
            appliedFiltersList.push(`Language: ${recommendationFilters.language}`);
        }

        if (activeFilters.includes('releaseYear') && recommendationFilters.releaseYear) {
            const year = parseInt(recommendationFilters.releaseYear);
            results = results.filter(movie => getYear(movie.releaseDate) === year);
            appliedFiltersList.push(`Year: ${recommendationFilters.releaseYear}`);
        }

        // Check if we found movies
        if (results.length > 0) {
            // Shuffle the results for variety
            results = results.sort(() => 0.5 - Math.random());
            
            // Return top 5 recommendations
            setRecommendedMovies(results.slice(0, 5));
            setAppliedFilters(appliedFiltersList);
        } else if (activeFilters.length > 0) {
            // No movies found, remove the last filter and try again
            const newActiveFilters = [...activeFilters];
            newActiveFilters.pop();
            findRecommendationsWithRelaxation(newActiveFilters);
        } else {
            // All filters have been removed, but still no results
            // This would only happen if the movies array is empty
            setRecommendedMovies([]);
            setAppliedFilters(['No filters applied']);
        }
    };

    return (
        <Modal
            title={<div className="flex items-center"><Star className="mr-2" /> Movie Recommendations</div>}
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Close
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={generateRecommendations}
                    className="bg-blue-600"
                >
                    Get Recommendations
                </Button>,
            ]}
            width={800}
        >
            <div className="mb-6">
                <p className="text-gray-500 mb-4">Select your preferences to get personalized movie recommendations.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                        <Select
                            placeholder="Select a genre"
                            className="w-full"
                            value={recommendationFilters.genre}
                            onChange={(value) => setRecommendationFilters({ ...recommendationFilters, genre: value })}
                            allowClear
                        >
                            {genres.map(genre => (
                                <Select.Option key={genre} value={genre}>{genre}</Select.Option>
                            ))}
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                        <Select
                            placeholder="Select a language"
                            className="w-full"
                            value={recommendationFilters.language}
                            onChange={(value) => setRecommendationFilters({ ...recommendationFilters, language: value })}
                            allowClear
                        >
                            {languages.map(language => (
                                <Select.Option key={language} value={language}>{language}</Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Release Year</label>
                    <Input
                        placeholder="Enter year (e.g., 2023)"
                        value={recommendationFilters.releaseYear}
                        onChange={(e) => setRecommendationFilters({ ...recommendationFilters, releaseYear: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Mood (1-5)</label>
                    <Rate
                        value={recommendationFilters.rating}
                        onChange={(value) => setRecommendationFilters({ ...recommendationFilters, rating: value })}
                    />
                </div>
            </div>

            {recommendedMovies.length > 0 && (
                <div className="mb-4">
                    Below are the recommended movies:
                </div>
            )}

            {recommendedMovies.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {recommendedMovies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-400">Click "Get Recommendations" to find movies.</p>
                </div>
            )}
        </Modal>
    );
};

export default MovieRecommendationModal;