var animals = new Object();
var animal;
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
      a.attr("data-name", animals[i].search);
      //Adding a value to each button in order to call later on
      a.attr("id",[i]);
      // Providing the button's text with a value of the animal at index i
      a.text(animals[i].search);

      // Adding the button to the HTML
      console.log('a ' + a);

      $("#animalSearchTerms").append(a);
    }

    //Tracking the click event on a button. Select the correct object and the corresponding GIF array
    // $(".animal").click(function(){
    //   event.preventDefault();   //Prevents the screen from refreshing
    //   //trim what is searched tp prevent extra space
    //   for (var i = 0; i < animals.length; i++) {
    //     if ((".animal").text() == animals[i].search) {
    //       var animalButton = animals[i].gifs;
    //       animalImages = '<img src=' + animalButton + ">";
    //       $(".animalsView").append(animalImages);
    //     }
    //   }
    // });
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
      }

      // $(".animalsView").append(animalGif())
    });
  };

//When a user searches, add the search to the animals array
$("#search").on("click", function(event){
  event.preventDefault();   //Prevents the screen from refreshing
  $(".animalsView").empty();
  //trim what is searched tp prevent extra space
  animal = $("#searchTerm").val().trim();

  //display the results
  searchGiphy();
  renderButtons();
  animals.gifs = gifSearch;
  animals.search = animal;
  console.log(animals);
  //Put a visul button on the screen representing their search

})

//When a user clicks on a button, display the related gifs



});
