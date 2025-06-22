const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

let movies = [
  {
    id: 1,
    title: "Inception",
    genre: "Science Fiction",
    year: 2010,
    rating: 8.8,
    duration: "2h 28min",
    summary:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    genre: "Drama",
    year: 1994,
    rating: 9.3,
    duration: "2h 22min",
    summary:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    rating: 9.0,
    duration: "2h 32min",
    summary:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: "Crime",
    year: 1994,
    rating: 8.9,
    duration: "2h 34min",
    summary:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 5,
    title: "Forrest Gump",
    genre: "Drama",
    year: 1994,
    rating: 8.8,
    duration: "2h 22min",
    summary:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    id: 6,
    title: "The Matrix",
    genre: "Science Fiction",
    year: 1999,
    rating: 8.7,
    duration: "2h 16min",
    summary:
      "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 7,
    title: "Gladiator",
    genre: "Action",
    year: 2000,
    rating: 8.5,
    duration: "2h 35min",
    summary:
      "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 8,
    title: "Interstellar",
    genre: "Science Fiction",
    year: 2014,
    rating: 8.6,
    duration: "2h 49min",
    summary:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },
  {
    id: 9,
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    rating: 8.6,
    duration: "2h 12min",
    summary:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Return of the King",
    genre: "Fantasy",
    year: 2003,
    rating: 8.9,
    duration: "3h 21min",
    summary:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 11,
    title: "Django Unchained",
    genre: "Western",
    year: 2012,
    rating: 8.4,
    duration: "2h 45min",
    summary:
      "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg",
  },
  {
    id: 12,
    title: "Spider-Man: Into the Spider-Verse",
    genre: "Animation",
    year: 2018,
    rating: 8.4,
    duration: "1h 57min",
    summary:
      "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX300.jpg",
  },
  {
    id: 13,
    title: "The Godfather",
    genre: "Crime",
    year: 1972,
    rating: 9.2,
    duration: "2h 55min",
    summary:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 14,
    title: "Schindler's List",
    genre: "Biography",
    year: 1993,
    rating: 8.9,
    duration: "3h 15min",
    summary:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 15,
    title: "Fight Club",
    genre: "Drama",
    year: 1999,
    rating: 8.8,
    duration: "2h 19min",
    summary:
      "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
  },
  {
    id: 16,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Fantasy",
    year: 2001,
    rating: 8.8,
    duration: "2h 58min",
    summary:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
  },
  {
    id: 17,
    title: "Star Wars: Episode V - The Empire Strikes Back",
    genre: "Sci-Fi",
    year: 1980,
    rating: 8.7,
    duration: "2h 4min",
    summary:
      "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 18,
    title: "Goodfellas",
    genre: "Crime",
    year: 1990,
    rating: 8.7,
    duration: "2h 26min",
    summary:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 19,
    title: "Se7en",
    genre: "Thriller",
    year: 1995,
    rating: 8.6,
    duration: "2h 7min",
    summary:
      "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 20,
    title: "The Silence of the Lambs",
    genre: "Thriller",
    year: 1991,
    rating: 8.6,
    duration: "1h 58min",
    summary:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 21,
    title: "Saving Private Ryan",
    genre: "War",
    year: 1998,
    rating: 8.6,
    duration: "2h 49min",
    summary:
      "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
  },
  {
    id: 22,
    title: "The Green Mile",
    genre: "Fantasy",
    year: 1999,
    rating: 8.6,
    duration: "3h 9min",
    summary:
      "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX300.jpg",
  },
  {
    id: 23,
    title: "Spirited Away",
    genre: "Animation",
    year: 2001,
    rating: 8.6,
    duration: "2h 5min",
    summary:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },
  {
    id: 24,
    title: "The Prestige",
    genre: "Mystery",
    year: 2006,
    rating: 8.5,
    duration: "2h 10min",
    summary:
      "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNl5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg",
  },
  {
    id: 25,
    title: "The Departed",
    genre: "Crime",
    year: 2006,
    rating: 8.5,
    duration: "2h 31min",
    summary:
      "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_SX300.jpg",
  },
  {
    id: 26,
    title: "Whiplash",
    genre: "Drama",
    year: 2014,
    rating: 8.5,
    duration: "1h 46min",
    summary:
      "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },
  {
    id: 27,
    title: "Alien",
    genre: "Horror",
    year: 1979,
    rating: 8.4,
    duration: "1h 57min",
    summary:
      "After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious life form and they soon realize that its life cycle has merely begun.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BOGQzZTBjMjQtOTVmMS00NGE5LWEyYmMtOGQ1ZGZjNmRkYjFhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
  },
  {
    id: 28,
    title: "Back to the Future",
    genre: "Sci-Fi",
    year: 1985,
    rating: 8.5,
    duration: "1h 56min",
    summary:
      "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the eccentric scientist Doc Brown.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    id: 29,
    title: "The Lion King",
    genre: "Animation",
    year: 1994,
    rating: 8.5,
    duration: "1h 28min",
    summary:
      "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NDI@._V1_SX300.jpg",
  },
  {
    id: 30,
    title: "American History X",
    genre: "Drama",
    year: 1998,
    rating: 8.5,
    duration: "1h 59min",
    summary:
      "A former neo-nazi skinhead tries to prevent his younger brother from going down the same wrong path that he did.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BZTJhN2FkYWEtMGI0My00YWM4LWI2MjAtM2UwNjY4MTI2ZTQyXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_SX300.jpg",
  },
  {
    id: 31,
    title: "Terminator 2: Judgment Day",
    genre: "Sci-Fi",
    year: 1991,
    rating: 8.5,
    duration: "2h 17min",
    summary:
      "A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son John from a more advanced and powerful cyborg.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 32,
    title: "Memento",
    genre: "Mystery",
    year: 2000,
    rating: 8.4,
    duration: "1h 53min",
    summary:
      "A man with short-term memory loss attempts to track down his wife's murderer.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 33,
    title: "Braveheart",
    genre: "Biography",
    year: 1995,
    rating: 8.3,
    duration: "2h 58min",
    summary:
      "Scottish warrior William Wallace leads his countrymen in a rebellion to free his homeland from the tyranny of King Edward I of England.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtMDIyOC00c3BCLWIxMTctMzkzOTdhMzdhZjU5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
  },
  {
    id: 34,
    title: "Inglourious Basterds",
    genre: "War",
    year: 2009,
    rating: 8.3,
    duration: "2h 33min",
    summary:
      "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BOTJiNDEzOWYtMTVjOC00ZjlmLWE0NGMtZmE1OWVmZDQ2OWJhXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
  },
  {
    id: 35,
    title: "Oldboy",
    genre: "Thriller",
    year: 2003,
    rating: 8.4,
    duration: "2h",
    summary:
      "After being kidnapped and imprisoned for fifteen years, Oh Dae-Su is released, only to find that he must find his captor in five days.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTI3NTQyMzU5M15BMl5BanBnXkFtZTcwMTM2MjgyMQ@@._V1_SX300.jpg",
  },
  {
    id: 36,
    title: "Coco",
    genre: "Animation",
    year: 2017,
    rating: 8.4,
    duration: "1h 45min",
    summary:
      "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BYjQ5NjM0Y2YtNjZkNC00ZDhkLWJjMWItN2QyNzFkM2Y5NWM3XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    id: 37,
    title: "Joker",
    genre: "Thriller",
    year: 2019,
    rating: 8.4,
    duration: "2h 2min",
    summary:
      "A mentally troubled comedian embarks on a downward spiral that leads to the creation of an iconic villain.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
  },
  {
    id: 38,
    title: "Your Name.",
    genre: "Animation",
    year: 2016,
    rating: 8.4,
    duration: "1h 46min",
    summary:
      "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BODRmZDVmNzUtZDA4ZC00NjhkLWI2M2UtN2M0ZDIzNDcxYThjL2ltYWdlXkEyXkFqcGdeQXVyNTk0MzMzODA@._V1_SX300.jpg",
  },
  {
    id: 39,
    title: "3 Idiots",
    genre: "Comedy",
    year: 2009,
    rating: 8.4,
    duration: "2h 50min",
    summary:
      "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently, even as the rest of the world called them 'idiots'.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODY3MDRkMTBmN2U2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 40,
    title: "A Clockwork Orange",
    genre: "Sci-Fi",
    year: 1971,
    rating: 8.3,
    duration: "2h 16min",
    summary:
      "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTY3MjM1Mzc4N15BMl5BanBnXkFtZTgwODM0NzAxMDE@._V1_SX300.jpg",
  },
  {
    id: 41,
    title: "Snatch",
    genre: "Comedy",
    year: 2000,
    rating: 8.3,
    duration: "1h 42min",
    summary:
      "Unscrupulous boxing promoters, violent bookmakers, a Russian gangster, incompetent amateur robbers and supposedly Jewish jewelers fight to track down a priceless stolen diamond.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTA2NDYxOGYtYjU1Mi00Y2QzLTgxMTQtMWI1MGI0ZGQ5MmU4XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
  },
  {
    id: 42,
    title: "Amélie",
    genre: "Comedy",
    year: 2001,
    rating: 8.3,
    duration: "2h 2min",
    summary:
      "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her and, along the way, discovers love.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
  },
  {
    id: 43,
    title: "Eternal Sunshine of the Spotless Mind",
    genre: "Drama",
    year: 2004,
    rating: 8.3,
    duration: "1h 48min",
    summary:
      "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg",
  },
  {
    id: 44,
    title: "Reservoir Dogs",
    genre: "Crime",
    year: 1992,
    rating: 8.3,
    duration: "1h 39min",
    summary:
      "When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BZmExNmEwYWItYmQzOS00YjA5LTk2MjktZjAkZGEzNzBiOTM0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    id: 45,
    title: "The Great Dictator",
    genre: "Comedy",
    year: 1940,
    rating: 8.4,
    duration: "2h 5min",
    summary:
      "Dictator Adenoid Hynkel tries to expand his empire while a poor Jewish barber tries to avoid persecution from Hynkel's regime.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMmExYWJjNTktNGUyZS00ODhmLTkxYzAtNWIzOGEyMGNiMmUwXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    id: 46,
    title: "Blade Runner 2049",
    genre: "Sci-Fi",
    year: 2017,
    rating: 8.0,
    duration: "2h 44min",
    summary:
      "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg",
  },
  {
    id: 47,
    title: "Mad Max: Fury Road",
    genre: "Action",
    year: 2015,
    rating: 8.1,
    duration: "2h",
    summary:
      "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },
  {
    id: 48,
    title: "No Country for Old Men",
    genre: "Crime",
    year: 2007,
    rating: 8.1,
    duration: "2h 2min",
    summary:
      "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BMjA5Njk3MjM4OV5BMl5BanBnXkFtZTcwMTc5MTE1MQ@@._V1_SX300.jpg",
  },
];

let users = [];

app.post("/api/users/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  const newUser = {
    id: Date.now(),
    username,
    email,
    password,
  };

  users.push(newUser);
  console.log("New user registered:", newUser);
  console.log("All users:", users);

  res.status(201).json({ message: "User registered successfully" });
});

app.get("/api/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movie = movies.find((m) => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

app.get("/api/movies", (req, res) => {
  const { title, limit, offset } = req.query;
  let filtered = movies;

  if (title) {
    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  const start = parseInt(offset, 10) || 0;
  const end = start + (parseInt(limit, 10) || 12);
  const paginated = filtered.slice(start, end);

  res.json({
    movies: paginated,
    total: filtered.length,
  });
});
app.listen(port, () => {
  console.log(`Cinebase server is running and listening on the port ${port}`);
});
