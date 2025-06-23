// const express = require("express");
// const cors = require("cors");
// const app = express();
// const port = 3001;

// app.use(express.json());
// app.use(cors());

// // let users = [];

// app.post("/api/users/register", (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   const existingUser = users.find((user) => user.email === email);
//   if (existingUser) {
//     return res
//       .status(409)
//       .json({ message: "User with this email already exists" });
//   }

//   const newUser = {
//     id: Date.now(),
//     username,
//     email,
//     password,
//     likedMovies: [],
//   };

//   users.push(newUser);
//   console.log("New user registered:", newUser);
//   console.log("All users:", users);

//   res.status(201).json({ message: "User registered successfully" });
// });

// app.post("/api/users/login", (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   const user = users.find((u) => u.email === email && u.password === password);

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const { password: userPassword, ...userWithoutPassword } = user;

//   res.status(200).json({
//     message: "Login successful",
//     user: userWithoutPassword,
//   });
// });

// app.post("/api/users/:userId/toggle-like", (req, res) => {
//   const { userId } = req.params;
//   const { movieId } = req.body;

//   if (!movieId) {
//     return res.status(400).json({ message: "Movie ID is required" });
//   }

//   const user = users.find((u) => u.id === parseInt(userId, 10));
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const movieIndex = user.likedMovies.indexOf(movieId);

//   if (movieIndex > -1) {
//     user.likedMovies.splice(movieIndex, 1);
//   } else {
//     user.likedMovies.push(movieId);
//   }

//   console.log(`User ${user.username} liked movies:`, user.likedMovies);

//   res.status(200).json({ likedMovies: user.likedMovies });
// });

// app.post("/api/movies/liked", (req, res) => {
//   const { ids } = req.body;

//   if (!ids || !Array.isArray(ids)) {
//     return res
//       .status(400)
//       .json({ message: "An array of movie IDs is required." });
//   }

//   const likedMoviesData = movies.filter((movie) => ids.includes(movie.id));

//   res.status(200).json({ movies: likedMoviesData });
// });

// app.get("/api/movies/:id", (req, res) => {
//   const movieId = parseInt(req.params.id, 10);
//   const movie = movies.find((m) => m.id === movieId);

//   if (movie) {
//     res.json(movie);
//   } else {
//     res.status(404).json({ message: "Movie not found" });
//   }
// });

// app.get("/api/movies", (req, res) => {
//   const { title, limit, offset } = req.query;
//   let filtered = movies;

//   if (title) {
//     filtered = filtered.filter((movie) =>
//       movie.title.toLowerCase().includes(title.toLowerCase())
//     );
//   }

//   const start = parseInt(offset, 10) || 0;
//   const end = start + (parseInt(limit, 10) || 12);
//   const paginated = filtered.slice(start, end);

//   res.json({
//     movies: paginated,
//     total: filtered.length,
//   });
// });

// app.listen(port, () => {
//   console.log(`Cinebase server is running and listening on the port ${port}`);
// });
require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likedMovies: { type: [Number], default: [] },
});

const movieSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  summary: { type: String, required: true },
  rating: { type: Number, required: true },
  genre: { type: String },
  year: { type: Number },
  duration: { type: String },
});

const User = mongoose.model("User", userSchema);
const Movie = mongoose.model("Movie", movieSchema);

const moviesData = require("./moviesData");

const seedDatabase = async () => {
  try {
    const movieCount = await Movie.countDocuments();
    if (movieCount === 0) {
      console.log("No movies in DB, seeding...");

      await Movie.insertMany(moviesData);
      console.log("✅ Database seeded successfully!");
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
    seedDatabase();
  })
  .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

app.post("/api/users/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    const newUser = new User({ id: Date.now(), username, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password }).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res
      .status(200)
      .json({ message: "Login successful", user: user.toObject() });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/users/:userId/toggle-like", async (req, res) => {
  try {
    const { userId } = req.params;
    const { movieId } = req.body;
    const user = await User.findOne({ id: userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const movieIndex = user.likedMovies.indexOf(movieId);
    if (movieIndex > -1) {
      user.likedMovies.splice(movieIndex, 1);
    } else {
      user.likedMovies.push(movieId);
    }
    await user.save();
    res.status(200).json({ likedMovies: user.likedMovies });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post("/api/movies/liked", async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids)) {
      return res
        .status(400)
        .json({ message: "An array of movie IDs is required." });
    }
    const likedMoviesData = await Movie.find({ id: { $in: ids } });
    res.status(200).json({ movies: likedMoviesData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findOne({ id: parseInt(req.params.id, 10) });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 12;
    const offset = parseInt(req.query.offset, 10) || 0;
    const searchQuery = req.query.q || "";

    const query = searchQuery ? { title: new RegExp(searchQuery, "i") } : {};

    const movies = await Movie.find(query)
      .sort({ id: 1 })
      .skip(offset)
      .limit(limit);

    const totalMovies = await Movie.countDocuments(query);

    res.json({
      movies: movies,
      total: totalMovies,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Cinebase server is running and listening on the port ${port}`);
});
