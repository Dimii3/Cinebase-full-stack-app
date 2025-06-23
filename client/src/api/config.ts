const API_URL = "http://localhost:3001/api";
const API_CONFIG = {
  baseURL: API_URL,
  endpoints: {
    movies: `${API_URL}/movies`,
    movieDetails: (id: string | number) => `${API_URL}/movies/${id}`,
    searchMovies: (title: string) =>
      `${API_URL}/movies?title=${encodeURIComponent(title)}`,
    likedMovies: `${API_URL}/movies/liked`,
    user: {
      register: `${API_URL}/users/register`,
      login: `${API_URL}/users/login`,
    },
  },
};
export default API_CONFIG;
