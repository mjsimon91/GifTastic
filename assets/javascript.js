var animals =[];
var gifSearch =[];
var queryURL;
var animalImages;
var animal;
var a;
var animalSearch = [];
var gifTitle;
var gifRating;
var cardDiv;
var gifDiv;

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
      a.addClass("animal btn btn-primary");
      //Adding a type for the button
      a.attr("type","submit")
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
      $(".animalsView").empty();
      animal = $(this).attr("data-name");
      searchGiphy();



      //display the results
    });
  }

  //Perform a GET call to the Giphy API

  function searchGiphy(){

    queryURL = 'https://api.giphy.com/v1/gifs/search?q=baby_' + animal + '&limit=10&api_key=Tu8qUgRyzzyJnRNoUgJ6mAlHn03u67S6';

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      for (var i = 0; i < response.data.length; i++) {
      animalAnimate = response.data[i].images.original.url;
      animalStill = response.data[i].images.fixed_height_still.url;
      gifTitle = response.data[i].title;
      gifRating = response.data[i].rating;

      //add the mp4 to the HTML

      gifDiv = $('<div>');
      gifDiv.addClass("col-lg-3 col-md-3 col-sm-6 col-12 animalGif")
      cardFooter = $('<div class="card-footer">');


      var cardHeader = $('<h5>');
      cardHeader.addClass("card-title gifTitle")
      cardHeader.text(gifTitle);

      var cardRating = $('<small>');
      cardRating.addClass("text-muted")
      cardRating.text('Rating ' + gifRating);

      cardFooter.append(cardHeader);
      cardFooter.append(cardRating);

      animalImages = $("<img>");
      animalImages.addClass('animalGiphy card-img-top')
      animalImages.attr("src", animalStill);
      animalImages.attr("data-animate",animalAnimate);
      animalImages.attr("data-still", animalStill);
      animalImages.attr("data-state", "Still");

      gifDiv.append(animalImages);
      gifDiv.append(cardFooter);


      $(".animalsView").append(gifDiv);

      gifSearch.push(animalAnimate);
      $(animalSearch).append(gifSearch);
      }
        console.log(queryURL);
      // $(".animalsView").append(animalGif())
      $(".animalGiphy").on("click", function(event){
        if ($(this).attr("data-state") == "Still") {
          console.log($(this).attr("src"));
          $(this).attr("src", $(this).attr("data-animate"))
          $(this).attr("data-state", "Animated")
        } else {
          $(this).attr("src", $(this).attr("data-still"))
          $(this).attr("data-state", "Still")
        }
      })
    });
  }

//When a user searches, add the search to the animals array
$("#search").on("click", function(event){
  event.preventDefault();   //Prevents the screen from refreshing
  $(".animalsView").empty();
  $(".babyAnimalCarousel").empty();
  //trim what is searched tp prevent extra space
  animal = $("#searchTerm").val().trim()
  animals.push(animal);
  console.log(animal);
  //display the results
  searchGiphy();


  //Put a visul button on the screen representing their search if they have not searched this term before

  renderButtons();
});



});
