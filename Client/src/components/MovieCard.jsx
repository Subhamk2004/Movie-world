import React from 'react';
import { Film, Heart, Calendar } from 'lucide-react';

const MovieCard = ({ movie }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    // Get year from date
    const getYear = (dateString) => {
        return new Date(dateString).getFullYear();
    };

    return (

        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-64 overflow-hidden relative">
                <img
                    src={movie.posters?.[0] || "/api/placeholder/300/450"}
                    alt={movie.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <h3 className="text-white text-xl font-bold">{movie.name}</h3>
                    <p className="text-gray-300 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {getYear(movie.releaseDate)}
                    </p>
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs uppercase">{movie.genre}</span>
                    <span className="text-gray-400 text-sm">{movie.language}</span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-2">{movie.plot}</p>
                <div className="mt-4 flex justify-between">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
                        <Film className="w-4 h-4 mr-1" />
                        Watch Trailer
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md">
                        <Heart className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}


export default MovieCard;