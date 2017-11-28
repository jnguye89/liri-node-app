var Spotify = require("node-spotify-api");
var request = require("request");
var Twitter = require("twitter");
var fs = require("fs");

var liriCommand = process.argv[2];


//----------------------- INTERNAL KEY NOTES
//twitter API key VkwTjSZ9471SxDi0Crpr0M0FP
//OMDB API key eb04ce92

// http://www.omdbapi.com/?apikey=[yourkey]&

//-----------------------


//function to call spotify API
var spotifySong = function(song){
	var spotify = new Spotify({
		id: '9ccd50983afa4baf8c4b72523fee68f9',
		secret: '27cc2ae6a9694fc3976697990b91bab2'
	});

	spotify.search({ type: 'track', query: song}, function(err, data) {
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
			console.log("");

		})

	});
}

//function handles the do-what-it-says request
var randomRequest = function(){
	fs.readFile("random.txt","utf-8", function(err, data){
		if (err){
			return console.log(err);
		}

		// console.log(data.split(",")[0]);
		liriCommand = data.split(",")[0];
		var title = data.split(",")[1];

		if (liriCommand === 'spotify-this-song'){
			spotifySong(title);
		} else if(liriCommand === 'movie-this'){
			var movieChoice = title;
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
				    console.log("");
				  }

			})
		} else if(liriCommand === 'my-tweets'){
			twitterRequest();
		}

		// spotifySong(song);
	})
}


//function handles twitter feed request
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
				console.log("");
			})
		}
	});

}

//function handles the spotify song request
var spotifyRequest = function(){
	var songChoice = process.argv[3];

	spotifySong(songChoice);
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
		    console.log("");
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
		console.log("Please select from 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'");
}

