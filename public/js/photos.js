/* LOADS PHOTOS FROM FLICKR API */

// Make a Flickr API call to retrieve all public photos associated with a given user
var flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos"; // Base URL and API method (photosets.getPhotos)
flickrAPI += "&api_key=e6f93b9074f13bf14870f749f68b17a3"; // My API key
flickrAPI += "&photoset_id=72157646696845549"; // ID of the photoset to be retrieved
flickrAPI += "&user_id=125059154%40N07"; // User ID of the owner of the photoset to be retrieved
flickrAPI += "&format=json"; // Return photo information in JSON format
flickrAPI += "&nojsoncallback=1"; // Convert JSON to JSONP

// Function to retrieve photo information from API and set up photo grid
function getPhotos() {

    var xmlhttp = new XMLHttpRequest(); // Use an XML HTTP request to retrieve the JSON file returned by API call
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var data = JSON.parse(xmlhttp.responseText); // Parse the returned JSON file, save in "data" object
            var photos = data.photoset.photo;

            // Create each photo included in the JSON file and add it to the photogrid
            for (var i = 0; i < photos.length; i++) {
                var photo = data.photoset.photo[i];
                var src = "http://farm"
                          + photo.farm
                          + ".static.flickr.com/"
                          + photo.server
                          + "/"
                          + photo.id
                          + "_"
                          + photo.secret
                          + ".jpg";
                var image = document.createElement("img");
                image.src = src;
                image.id = photo.title;
                image.className = "thumbnail";

                // When a photo in the grid is clicked, start the lightbox
                image.addEventListener("click", function(e) {
                    triggerLightbox(photos)
                }, false);

                // Add each photo included in the JSON file to the photo grid
                document.getElementById("flickr").appendChild(image);
            }

            // When lightbox is active and navigation arrow is clicked, move the appropriate next image in gallery
            document.addEventListener("click", function(e) {
                iterateThroughGallery(e, photos)
            }, false);

            // When lightbox is active and background is clicked, hide lightbox
            document.addEventListener("click", function(e) {
              backgroundClicked(e)
            }, false);
        }
    };

    xmlhttp.open("GET", flickrAPI, true);
    xmlhttp.send();

};

// Call getPhotos() when the page loads
window.onload = function() {
    getPhotos();
}
