require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Movie = require("./models/Movie");
const moviesData = require("./moviesData");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB for seeding...");

    await Movie.deleteMany({});
    console.log("Old movies collection cleared.");

    await Movie.insertMany(moviesData);
    console.log("✅ Movies have been successfully seeded!");
  } catch (error) {
    console.error("❌ Error seeding the database:", error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed.");
  }
};

seedDatabase();
