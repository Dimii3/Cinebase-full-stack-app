const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const API_URL = `${BASE_URL}/api`;

const API_CONFIG = {
  baseURL: API_URL,
  endpoints: {
    movies: `${API_URL}/movies`,
    movieDetails: (id: string | number) => `${API_URL}/movies/${id}`,
    searchMovies: (query: string) =>
      `${API_URL}/movies?q=${encodeURIComponent(query)}`,
    likedMovies: `${API_URL}/movies/liked`,
    user: {
      register: `${API_URL}/users/register`,
      login: `${API_URL}/users/login`,
    },
  },
};
export default API_CONFIG;
