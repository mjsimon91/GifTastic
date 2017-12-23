var animals =[];
var searchGiphy;
var queryURL;
var animalImages;
var a;

//On page load
$(document).ready(function() {

// function animalGif(response) {
//   for (var i = 0; i < data.length; i++) {
//     animalImages = $("<img>").append(data[i].bitly_gif_url);
//   }
// }

//Render the screen to just show the search bar on page load
  function renderButtons(){
    $(".animalsView").empty();

    //loop through each search term and show each term as a button
    for (var i = 0; i < animals.length; i++) {

      // Create a button
      a = $("<button>");
      // Adding a class
      a.addClass("animal");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-name", animals[i]);
      // Providing the button's text with a value of the animal at index i
      a.text(animals[i]);
      // Adding the button to the HTML
      $("#animalSearchTerm").append(a);
      console.log(animals);
    }
  }

  searchGiphy = function(animal){
    queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + animal + '&api_key=Tu8qUgRyzzyJnRNoUgJ6mAlHn03u67S6';
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
      animalImages = '<img src=' + response.data[i].images.fixed_width_small.url + ">";
      $(".animalsView").append(animalImages)
      }

      // $(".animalsView").append(animalGif())
    })
  }

//When a user searches, add the search to the animals array
$("#search").click(function(event){
  event.preventDefault();   //Prevents the screen from refreshing

  //trim what is searched tp prevent extra space
  var animal = $("#searchTerm").val().trim()
  animals.push(animal);
  searchGiphy();
  //Put a visul button on the screen representing their search

  renderButtons();
})



//Perform a GET call to the Giphy API
//display the results
});
