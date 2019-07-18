require("dotenv").config();
var keys = require("./keys.js"),
  Spotify = require("node-spotify-api"),
  moment = require("moment"),
  axios = require("axios"),
  fs = require("fs"),
  spotify = new Spotify(keys.spotify),
  action = process.argv[2],
  mediaName = process.argv.slice(3).join(" ");

// add inquirer for a command prompt?

function lookUpConcerts(mediaName) {
  var queryUrl =
    "https://rest.bandsintown.com/artists/" + mediaName + "/events?app_id=d39d893ed786c2e9b3dc62af58a4fd9a";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log("\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n");
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
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n");
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
function lookUpSong(mediaName) {
  spotify
    .search({ type: "track", query: mediaName })
    .then(function(data) {
      var response = data.tracks.items;
      console.log("\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n");
      for (i = 0; i < response.length; i++) {
        console.log("Song: " + response[i].name);
        // Artist name still 'undefined'
        console.log("Artist: " + response[i].artists[0].name);
        console.log("Album: " + response[i].album.name);
        console.log("Preview Link: " + response[i].external_urls.spotify);
        console.log("\r\n");
      }
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n");
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
function lookUpMovie(mediaName) {
  var queryUrl = "http://www.omdbapi.com/?t=" + mediaName + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log(mediaName);
      console.log("\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n");
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      if (response.data.Ratings.length > 1) {
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      }
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("\r\n~~~~~~~~~~~~~~~~~~~~~~~~~~\r\n");
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
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var dataArr = data.split(",");
    mediaName = dataArr[1];

    switch (dataArr[0]) {
      case "concert-this":
        lookUpConcerts(mediaName);
        break;
      case "spotify-this-song":
        lookUpSong(mediaName);
        break;
      case "movie-this":
        lookUpMovie(mediaName);
        break;
      default:
        console.log("Unrecognizable command");
    }
  });
}

switch (action) {
  case "concert-this":
    lookUpConcerts(mediaName);
    break;
  case "spotify-this-song":
    lookUpSong(mediaName);
    break;
  case "movie-this":
    lookUpMovie(mediaName);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("Unrecognizable command");
}
