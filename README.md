# 🎬 Cinematic Hub

A modern, intuitive movie discovery platform that helps users find their next favorite film.

![Cinematic Hub Banner](https://via.placeholder.com/1200x300)

## 📋 Overview

Cinematic Hub is a full-featured movie discovery application built with React and Redux. It provides a sleek interface for browsing, searching, and getting personalized movie recommendations. The platform is designed to deliver a seamless user experience with responsive design and intelligent search capabilities.

## ✨ Features

### Core Features
- **Movie Browsing**: Browse through our extensive collection of movies with pagination support
- **Recent Releases**: Quickly view the latest movie releases at a glance
- **Smart Search**: Find movies by title, genre, or language with instant results
- **Intelligent Recommendations**: Even when searches don't match exactly, our system suggests related movies
- **Advanced Filtering**: Get personalized movie recommendations based on your preferences

### User Experience
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Intuitive Interface**: Clean and user-friendly design for seamless navigation
- **Pagination**: Efficiently browse through large movie collections
- **Dynamic Content Loading**: Smooth transitions between different sections

## 🖼️ Screenshots

<div style="display: flex; justify-content: space-between;">
  <img src="https://via.placeholder.com/400x225" alt="Home Page" width="45%">
  <img src="https://via.placeholder.com/400x225" alt="Search Results" width="45%">
</div>
<div style="display: flex; justify-content: space-between; margin-top: 20px;">
  <img src="https://via.placeholder.com/400x225" alt="Movie Recommendations" width="45%">
  <img src="https://via.placeholder.com/400x225" alt="Movie Details" width="45%">
</div>

## 🛠️ Technologies Used

- **Frontend**:
  - React.js - UI library
  - Redux - State management
  - Ant Design - UI component library
  - Tailwind CSS - Utility-first CSS framework
  - Lucide React - Icon library

- **API Integration**:
  - Custom movie data API
  - RESTful API architecture

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cinematic-hub.git
   cd cinematic-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```
   REACT_APP_API_URL=your_api_url_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   The application will be running at `http://localhost:3000`

## 📂 Project Structure

```
src/
├── apis/               # API service functions
├── components/         # Reusable components
│   └── MovieCard.jsx   # Movie card component
├── pages/              # Application pages
│   └── Home/
│       ├── Home.jsx                     # Main home page
│       └── MovieRecommendationModal.jsx # Recommendation modal component
├── redux/              # Redux store configuration
│   └── loadersSlice.js # Loading state management
├── App.js              # Root component
└── index.js            # Application entry point
```

## 🌟 Key Features Explained

### Smart Search & Recommendations

When users search for movies, our application:
1. Filters results based on movie name, genre, and language
2. If no exact matches are found, it generates intelligent recommendations by:
   - Finding partial matches in movie titles
   - Identifying related genres or languages
   - Suggesting movies with similar first letters
   - Providing popular movies as a fallback

### Personalized Movie Recommendations

Users can get tailored movie recommendations through our modal:
1. Select preferences for genre, language, release year, and mood
2. Our algorithm finds the best matches based on selected criteria
3. If exact matches aren't available, it progressively relaxes filters to ensure users always get recommendations

### Responsive Grid Layouts

The application features responsive grid layouts that adapt to different screen sizes:
- Extra large screens: 6 columns for movies display
- Large screens: 4 columns
- Medium screens: 3 columns
- Small screens: 2 columns
- Mobile: 1 column

## 🔄 Upcoming Features

- User accounts and favorite movie lists
- Movie ratings and reviews
- Advanced filtering options
- Movie trailer integration
- Social sharing capabilities
- Dark/light theme toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

Project Link: [https://github.com/yourusername/cinematic-hub](https://github.com/yourusername/cinematic-hub)

---

### Made with ❤️ for movie lovers everywhere