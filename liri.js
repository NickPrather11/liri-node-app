require("dotenv").config();
var keys = require("./keys.js"),
  spotify = new Spotify(keys.spotify),
  axios = require("axios"),
  fs = require("fs"),
  action = process.argv[2];

function lookUpConcerts() {
  var bandName = process.argv[3];
  if (process.argv.length > 4) {
    for (i = 4; i < process.argv.length; i++) {
      bandName += "+" + process.argv[i];
    }
  }
  // query BandsInTown
}
function lookUpSong() {
  var songName = process.argv[3];
  if (process.argv.length > 4) {
    for (i = 4; i < process.argv.length; i++) {
      songName += "+" + process.argv[i];
    }
  }
  // query Spotify API
}
function lookUpMovie() {
  var movieName = process.argv[3];
  if (process.argv.length > 4) {
    for (i = 4; i < process.argv.length; i++) {
      movieName += "+" + process.argv[i];
    }
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // query OMDB API
  axios
    .get(queryUrl)
    .then(function(response) {
      console.log("\r\n\r\n");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("\r\n");
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("\r\n");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("\r\n\r\n");
    })
    .catch(function(error) {
      if (error.response) {
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}
function doWhatItSays() {
  // run specified "action" variable command for info provided in random.txt
}

switch (action) {
  case "concert-this":
    lookUpConcerts();
    break;
  case "spotify-this-song":
    lookUpSong();
    break;
  case "movie-this":
    lookUpMovie();
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("Unrecognizable command");
}
