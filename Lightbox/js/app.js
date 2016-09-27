//Problem: User when cliking on image goes to dead end
//solution: Create an overlay with this large image - lightbox
var $overlay = $("<div id='overlay'></div>");
var $image = $("<img>");
var $caption = $("<p></p>");
//add image to overlay
$overlay.append($image);

 // Add caption to overlay
$overlay.append($caption);

// Add overlay to body
$("body").append($overlay);


// Capture the click event on a to an image
$("#imageGallery li a").click(function(event) {
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  
   // Update overlay with the image linked in the link
  
  $image.attr("src", imageLocation)
  
  // Show the overlay
  $overlay.show();
 
  // Get child's alt attribute and set the caption
  var captionText = $(this).children("img").attr("alt");
  $caption.text(captionText);
});

// When the overlay is cliked
$overlay.click(function() {
  // Hide the overlay
  $overlay.hide();
});