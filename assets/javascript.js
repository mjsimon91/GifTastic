var animals =[];
var gifSearch =[];
var queryURL;
var animalImages;
var animal;
var a;
var animalSearch = [];

//On page load
$(document).ready(function() {



//Render the screen to just show the search bar on page load
  function renderButtons(){
    $("#animalSearchTerms").empty();

    //loop through each search term and show each term as a button
    for (var i = 0; i < animals.length; i++) {

      // Create a button
      a = $("<button>");
      // Adding a class
      a.addClass("animal");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-name", animals[i]);
      //Adding a value to each button in order to call later on
      a.attr("id",[i]);
      // Providing the button's text with a value of the animal at index i
      a.text(animals[i]);

      // Adding the button to the HTML

      $("#animalSearchTerms").append(a);
    }
    $(".animal").click(function(){
      event.preventDefault();   //Prevents the screen from refreshing
      //trim what is searched tp prevent extra space
      var animal = $(".animal").text();
      console.log(animal);



      //display the results
    });
  }

  //Perform a GET call to the Giphy API

  function searchGiphy(){
    queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=Tu8qUgRyzzyJnRNoUgJ6mAlHn03u67S6';
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      for (var i = 0; i < response.data.length; i++) {
      animalGif = response.data[i].images.fixed_width_small.url;
      animalImages = '<img src=' + animalGif + ">";
      $(".animalsView").append(animalImages);
      gifSearch.push(animalGif)
      $(animalSearch).append(gifSearch)
      console.log(gifSearch);
      }

      // $(".animalsView").append(animalGif())
    });
  };

//When a user searches, add the search to the animals array
$("#search").on("click", function(event){
  event.preventDefault();   //Prevents the screen from refreshing
  $(".animalsView").empty();
  //trim what is searched tp prevent extra space
  var animal = $("#searchTerm").val().trim();
  animals.push(animal);
  //display the results
  searchGiphy();

  //Put a visul button on the screen representing their search

  renderButtons();
})

//When a user clicks on a button, display the related gifs



});
