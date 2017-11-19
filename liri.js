var Spotify = require("node-spotify-api");
var request = require("request");
var Twitter = require("twitter");


var liriCommand = process.argv[2];


//----------------------- INTERNAL KEY NOTES
//twitter API key VkwTjSZ9471SxDi0Crpr0M0FP
//OMDB API key eb04ce92

// http://www.omdbapi.com/?apikey=[yourkey]&

//-----------------------

//function handles to spotify song request

var twitterRequest = function(){
	var twitterKeys = require("./keys.js");

	// console.log(twitterKeys);

	var client = new Twitter(twitterKeys);
	var params = {screen_name: 'jnguyen916'};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			tweets.forEach(function(value){
				console.log("Tweet: " + value.text);
				console.log("Date: " + value.created_at);
				console.log("---------------------------------------------------");
			})
		}
	});

}

var spotifyRequest = function(){
	var songChoice = process.argv[3];

	var spotify = new Spotify({
		id: '9ccd50983afa4baf8c4b72523fee68f9',
		secret: '27cc2ae6a9694fc3976697990b91bab2'
	});

	spotify.search({ type: 'track', query: songChoice}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
	
		// console.log(data.tracks.items);

		data.tracks.items.forEach(function(value){
			console.log("Artist Name: " + value.artists[0].name);
			console.log("Song Name: " + value.name);
			console.log("Preview Link: " + value.preview_url);
			console.log("Alumb Name: " + value.album.name);

			console.log("---------------------------------------------------");

		})

	});
}



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

		    // Parse the body of the site and recover just the imdbRating
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


