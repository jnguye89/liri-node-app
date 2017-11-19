// var spotify = require("node-spotify-api");
var request = require("request");
// var twitter = require("twitter");

// var twitterKeys = require("./keys.js");

var liriCommand = process.argv[2];


//-----------------------
//twitter API key VkwTjSZ9471SxDi0Crpr0M0FP
//OMDB API key eb04ce92

// http://www.omdbapi.com/?apikey=[yourkey]&

//-----------------------


//function handles the movie request from ODB
var omdbRequest = function(){
	var movieChoice = process.argv[3];
	// console.log(movieChoice)
	var movieChoiceArray = movieChoice.split(" ");
	var movie = movieChoiceArray.join("+");
	// console.log(movie)
	var APIrequest = "http://www.omdbapi.com/?apikey=eb04ce92&t=" + movie;

	request(APIrequest, function(error, response, body){
		if (!error && response.statusCode === 200) {

			// console.log(JSON.stringify(response,null,4));
		    // Parse the body of the site and recover just the imdbRating
		    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
		    console.log("Movie Title: " + JSON.parse(body).Title);
		    console.log("Release Year: " + JSON.parse(body).Year);
		    console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
		    console.log("Rotten Tomaties Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country where movie was produced: " + JSON.parse(body).Country);
		    console.log("Movie language: " + JSON.parse(body).Language);
		    console.log("Movie plot: " + JSON.parse(body).Plot);
		    console.log("Actors: " + JSON.parse(body).Actors);
		  }

	})
}


switch(liriCommand){
	case 'my-tweets':
		twitterRequest();
		break;
	case 'spotify-this-song':
		spotifyRequest();
		break;
	case 'movie-this':
		omdbRequest();
		break;
	case 'do-what-it-says':
		randomRequest();
		break;
	default:
		console.log("Please select from 'my-tweets', 'spotify-this-son', 'movie-this', or 'do-what-it-says'");
}


