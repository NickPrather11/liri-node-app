require("dotenv").config();
var keys = require("./keys.js"),
  Spotify = require("node-spotify-api"),
  moment = require("moment"),
  axios = require("axios"),
  fs = require("fs"),
  spotify = new Spotify(keys.spotify),
  action = process.argv[2],
  mediaName = process.argv.slice(3).join(" ");

function lookUpConcerts() {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" + mediaName + "/events?app_id=d39d893ed786c2e9b3dc62af58a4fd9a";
  // query BandsInTown
  axios
    .get(queryUrl)
    .then(function(response) {
      console.log("\r\n");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("\r\n");
      console.log("Upcoming " + mediaName + " concerts:");
      console.log("\r\n");
      for (i = 0; i < response.data.length; i++) {
        var concert = response.data[i];
        var date = moment(concert.datetime, moment.ISO_8601).format("MM/DD/YYYY");
        console.log("Venue: " + concert.venue.name);
        console.log("Location: " + concert.venue.city + ", " + concert.venue.region);
        console.log("Date: " + date);
        console.log("\r\n");
      }
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("\r\n");
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
function lookUpSong() {
  // query Spotify API
  spotify.search({ type: "track", query: mediaName }).then(function(response) {
    console.log("\r\n");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("\r\n");
    console.log(response);
    // console.log("Song: " + response.data.Year);
    // console.log("Artist: " + response.data.Title);
    // console.log("Album: " + response.data.Ratings[1].value);
    // console.log("Preview Link: " + response.data.imdbRating);
    console.log("\r\n");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("\r\n");
  });
}
function lookUpMovie() {
  var queryUrl = "http://www.omdbapi.com/?t=" + mediaName + "&y=&plot=short&apikey=trilogy";
  // query OMDB API
  axios
    .get(queryUrl)
    .then(function(response) {
      console.log(mediaName);
      console.log("\r\n");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("\r\n");
      console.log("Title: " + response.data.Title);
      console.log("\r\n");
      console.log("Year: " + response.data.Year);
      console.log("\r\n");
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("\r\n");
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].value);
      console.log("\r\n");
      console.log("Country: " + response.data.Country);
      console.log("\r\n");
      console.log("Language: " + response.data.Language);
      console.log("\r\n");
      console.log("Plot: " + response.data.Plot);
      console.log("\r\n");
      console.log("Actors: " + response.data.Actors);
      console.log("\r\n");
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("\r\n");
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
