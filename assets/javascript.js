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
      a.attr("type","submit");
      // Adding a data-attribute with a value of the animal at index i
      a.attr("data-name", animals[i]);
      //Adding a value to each button in order to call later on
      a.attr("id",[i]);
      // Providing the button's text with a value of the animal at index i
      a.text(animals[i]);

      // Adding the button to the HTML

      $("#animalSearchTerms").append(a);
    }
    $(".animal").click(function(event){ //Need to add event to the function in order for this to work on firefox

      event.preventDefault();   //Prevents the screen from refreshing
      $(".animalsView").empty(); //Clear the previous search results from the DOM

      //Display the search text on the Button
      animal = $(this).attr("data-name");

      //track user clicks on the button with the text of the button they selected
      mixpanel.track("Button Click",{'Button Name': animal});

      //Search Giphy and display the results
      searchGiphy();

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
      animalAnimate = response.data[i].images.original.url;           //store the Gif Utl
      animalStill = response.data[i].images.fixed_height_still.url;   //store the url of the still iage of the Gif
      gifTitle = response.data[i].title;                              // store the title of the Gif
      gifRating = response.data[i].rating;                            // store the Gif rating

      //create a div that will hold all the contents of the Gif. This is a card in Bootstrap

      gifDiv = $('<div>');
      gifDiv.addClass("col-lg-3 col-md-3 col-sm-6 col-12 animalGif");
      cardFooter = $('<div class="card-footer">');

      //Add the Gif variable containing all the needed attributes to make the gif play and pause
      animalImages = $("<img>");
      animalImages.addClass('animalGiphy card-img-top');
      animalImages.attr("src", animalStill);
      animalImages.attr("data-animate",animalAnimate);
      animalImages.attr("data-still", animalStill);
      animalImages.attr("data-state", "Still");

      //Create a variable for the card title which will be added to the card header
      var cardHeader = $('<h5>');
      cardHeader.addClass("card-title gifTitle");
      cardHeader.text(gifTitle);

      //Create a variable for the Gif rating which will be added to the card
      var cardRating = $('<small>');
      cardRating.addClass("text-muted");
      cardRating.text('Rating ' + gifRating);

      //Add title and reating to the card footer
      cardFooter.append(cardHeader);
      cardFooter.append(cardRating);


      //Append the animal Gif to the div
      gifDiv.append(animalImages);
      //Append the card footer to the same card as the Gif content
      gifDiv.append(cardFooter);

      //Append the cards containing the Gifs to the animalsView
      $(".animalsView").append(gifDiv);
      }

      $(".animalGiphy").on("click", function(event){

        //Find out if the image is playing ot still
        if ($(this).attr("data-state") == "Still") {

          //if this is still, then play and change the state to animated
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "Animated");

          //track if the user plays a gif with the associated meta data
          mixpanel.track("Play", {'Gif Title': gifTitle, 'Gif URL':animalAnimate, 'rating':gifRating});

          //if the image is currently animated, then change back to a still image
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "Still");

          //track pausing a Gif
          mixpanel.track("Pause", {'Gif Title': gifTitle, "Animal Still": animalStill, 'rating':gifRating});


        }
      });
    });
  }

  //When a user searches, add the search to the animals array
  $("#search").on("click", function(event){
    event.preventDefault();   //Prevents the screen from refreshing
    $(".animalsView").empty();
    $(".babyAnimalCarousel").empty();
    //trim what is searched tp prevent extra space
    animal = $("#searchTerm").val().trim();

  //Find out if this search has already occured and if it has, do not add another button or push to the animals Array
    for (var i = 0; i < animals.length; i++) {
      if (animal == animals[i]) {
        searchGiphy();
        return;
      }
    }

    //Track the search event as well as the search term
    mixpanel.track('Search', {'Search Term': animal});

    animals.push(animal);
    renderButtons();
    searchGiphy();
  });
});
