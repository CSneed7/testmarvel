$("#find-comic").on("click", function (event) {

	event.preventDefault();
    var comic = $("#searchTerm").val().trim();
    
    
    var ts = Date.now();
    var hash = $.md5(ts + "837f7995a45f86cea726f48f1acd876861485a6a" + "b6dc65d2bd49abd244836cf5eb355445")
  
  var queryURL = "https://gateway.marvel.com/v1/public/characters?name=" + comic + "&ts=" + ts + "&apikey=b6dc65d2bd49abd244836cf5eb355445&hash=" + hash;


  $.ajax({
    url: queryURL,
    method: "GET"
  })

    .then(function(response) {
      console.log(queryURL);

      console.log(response);

   
      var output = response.data.results[0].comics.items;
      var extension = '.jpg';

      console.log(response.data.results[0].comics);
      
      var comicImage = $("<img>");
        
      comicImage.attr("src", response.data.results[0].thumbnail.path + extension).css({'width' : '350px' , 'height' : '350px'});

     
      for (var i = 0; i < output.length; i++) {

     
        var comicDiv = $("<div>");


        var p = $("<p>").text("Comics: " + output[i].name);
    

        comicDiv.append(p);
        comicDiv.prepend(comicImage);


        $("#movies-view").prepend(comicDiv);

              }
    });


	var ebayqueryURL = "http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=BrandenH-MarvelSi-PRD-6668815a4-427e2463&siteid=0&version=967&QueryKeywords=" + comic + "%20comic&%20books&AvailableItemsOnly=true&MaxEntries=10";

	$.ajaxPrefilter( function (options) {
		if (options.crossDomain && jQuery.support.cors) {
		  var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
		  options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
		  //options.url = "http://cors.corsproxy.io/url=" + options.url;
		}
	   });

	$.ajax({
		url: ebayqueryURL,
		method: "GET",
		
	})
	.then(function (response) {

		var parseresponse = JSON.parse(response)

		var hotmess = (parseresponse.Product[1].DetailsURL);
		console.log(parseresponse);
		console.log(hotmess);
		$("#hotmessdisplay").prepend(hotmess);
		$("#hotmessdisplay").attr("href",hotmess);

		$("#hotmessdisplay").on("click", function(){
			var href = $(this).find('a').attr('href');
        });


		var queryURL = "https://www.omdbapi.com/?t=" + comic + "&y=&plot=short&apikey=trilogy";
		
		$.ajax({
			url: queryURL,
			method: "GET"

		  }).then(function(response) {
			  console.log(response)
			var movieDiv = $("<div class='movie'>");
			var year = response.Year;
			var psix = $("<p>").text("Year: " + year);
			movieDiv.append(psix);
			var title = response.Title;
			var pfive = $("<p>").text("Title: " + title);
			movieDiv.append(pfive);
			var imbdrating = response.imdbRating;
			var pfour = $("<p>").text("IMDBRating: " + imbdrating);
			movieDiv.append(pfour);
			var rating = response.Rated;
			var pOne = $("<p>").text("Rating: " + rating);
			movieDiv.append(pOne);
			var released = response.Released;
			var pTwo = $("<p>").text("Released: " + released);
			movieDiv.append(pTwo);
			var plot = response.Plot;
			var pThree = $("<p>").text("Plot: " + plot);
			movieDiv.append(pThree);
			var imgURL = response.Poster;
			var image = $("<img>").attr("src", imgURL);
			movieDiv.append(image);
			$("#movies-view").append(movieDiv);
});
});
});