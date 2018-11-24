$(document).ready(function(){
	
	$.ajax({
		url:"http://www.omdbapi.com/?",
		type:"GET",
		dataType:"JSON",
		data:{
		t: "Toy+Story",
		apikey:"9d5df3e9",
		},
		success:function(data){
			console.log(data);
			var newTitle= $("<h1>"+ data.Title+ "</h1>");
			var newYear= $("<p> <b>Year Released:</b> "+data.Year+"</p>");
			var newRated= $("<p> <b>Rated:</b> "+data.Rated+"</p>");
			var newPlot=$("<p> <i>"+ data.Plot+ "</i> </p>");
			var newActors=$("<p> <b>Actors:</b> "+ data.Actors+"</p>");
			var newPoster=$("<img src="+data.Poster+">");

			$("#text").append(newTitle, newYear,newRated, newActors, newPlot);
			$("#moviePoster").append(newPoster);
			
			
			var ratings= data.Ratings;
			for(var i=0; i<ratings.length;i++){
				var newRatings=$("<p> <b>"+ data.Ratings[i].Source+"</b>: "+data.Ratings[i].Value +"</p>");
				$("#text").append(newRatings);
			
			}

			if (data.Metascore<40){
				$("#body").css("background-color","#ffc6c6");
			} else if (data.Metascore<=75){
				$("#body").css("background-color", "#ffffc6");
			} else if (data.Metascore>75){
				$("#body").css("background-color", "#d7ffc6");
			} else {
				$("#body").css("background-color", "#f3f3f3");
			}
			},

		error:function(data, textStatus, errorThrown){
			console.log("error");
			console.log(errorThrown);
		},


		});

	$("input").click(function(){
		$("input").removeAttr('value');
	});

	$("input").keypress(function(event){
		if(event.keyCode==13){
			$("button").click();
		}
	});

	$("button").click(function(){
		var movieSearch=$("input").val();
		$("h1").remove();
		$("p").remove();
		$("h3").remove();
		$("img").remove();
		$("h2").remove();

		$.ajax({
		url:"http://www.omdbapi.com/?",
		type:"GET",
		dataType:"JSON",
		data:{
		t: movieSearch,
		apikey:"9d5df3e9",
		},

		success:function(data){
			console.log(data);
			if (data.Response=="False"){
				$("#error").append("<h1> Sorry- we can't find that! </h1>");

			} else {

			var newTitle= $("<h1>"+ data.Title+ "</h1>");
			var newYear= $("<p> <b>Year Released:</b> "+data.Year+"</p>");
			var newRated= $("<p> <b>Rated:</b> "+data.Rated+"</p>");
			var newPlot=$("<p> <i>"+ data.Plot+ "</i> </p>");
			var newActors=$("<p> <b>Actors:</b> "+ data.Actors+"</p>");
			var newPoster=$("<img src="+data.Poster+">");

			$("#text").append(newTitle, newYear,newRated, newActors, newPlot);
			

			if (data.Poster=="N/A"){
				$("#moviePoster").append("<h2>No image available</h2>")
			} else {
				$("#moviePoster").append(newPoster);
			}
			
			var ratings= data.Ratings;
			for(var i=0; i<ratings.length;i++){
				var newRatings=$("<p> <b>"+ data.Ratings[i].Source+"</b>: "+data.Ratings[i].Value +"</p>");
				$("#text").append(newRatings);
			}
			}

			if (data.Metascore<40){
				$("#body").css("background-color","#ffc6c6");
			} else if (data.Metascore<=75){
				$("#body").css("background-color", "#ffffc6");
			} else if (data.Metascore>75){
				$("#body").css("background-color", "#d7ffc6");
			} else {
				$("#body").css("background-color", "#f3f3f3");
			}
			},

		error:function(data, textStatus, errorThrown){
			console.log("error");
			console.log(errorThrown);
		},


		});
	});

});