const API_URL = "http://localhost:3001/api";
const API_CONFIG = {
  baseURL: API_URL,
  endpoints: {
    movies: `${API_URL}/movies`,
    movieDetails: (id: string | number) => `${API_URL}/movies/${id}`,
    searchMovies: (title: string) =>
      `${API_URL}/movies?title=${encodeURIComponent(title)}`,
    user: {
      register: `${API_URL}/users/register`,
      login: `${API_URL}/users/login`,
      profile: (username: string) => `${API_URL}/users/${username}`,
    },
  },
};
export default API_CONFIG;
