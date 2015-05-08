$(document).ready(function() {
	console.log("Oooh yeah! Let's get coding!");
	
	$(".glyphicon").addClass("gray");	//set the social icons to default to gray

	$("#search-by-title-button").on("click", createAndSend);
	$("#search-by-title-reset").on("click", clearForm);

	//create query
	function createAndSend( event ) {
		event.preventDefault();
		console.log("we are creating and sending");
		
		var queryString = $("form").serialize();
		var baseUrl = "http://www.omdbapi.com/?";

		console.log(baseUrl + queryString);

		//wait for response
		$.get(baseUrl + queryString, renderMovieDetails);
		// clearForm();
	}

	//clear form
	function clearForm() {
		$("form").trigger("reset");
	}

	//activate social icons
	function toggleSocial() {
		$(this).toggleClass("gray");
	}

	//Insert all data from the query response into article template
	//"data" is what is returned by $.get upon success
	function renderMovieDetails( data ) {

		var $article = $("article.hidden"); //grab template
		var $clone = $article.clone();		//copy the template for editing

		var $title = $clone.find(".movie-title");
		var $year = $("<small>");
		var actors = data.Actors.split(",");
		var $actorsList = $clone.find(".movie-actors");	

		$actorsList.text(""); //remove the filler list

		$clone.find(".movie-poster").attr("src", data.Poster);
		$clone.find(".movie-genre").text(data.Genre);
		$year.addClass("movie-year").text(data.Year);
		$title.text(data.Title + " ").append($year);	//put the year INTO the tag with the title
		$clone.find(".movie-description").text(data.Plot);

		//parse actor list into individual list items
		actors.forEach(function (currVal, index) {
			$actorsList.append("<li>" + currVal + "</li>");
		});
	
		//set event listener so that icons will change colors on click
		$clone.find(".glyphicon").on("click", toggleSocial);

		$clone.removeClass("hidden");	//remove hidden class so new movie will show
		$article.parent().append($clone);
	}

});



//attr("src", URL)
//article
//	img
//	div col-12
//		p, h2, p ul, div social

