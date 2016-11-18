/* SETS UP THE LIGHTBOX GALLERY */

// Fetch source and title for large lightbox image, call the function to build the lightbox gallery
function triggerLightbox(photos) {
    var photos = photos,
        lightboxImageSrc = event.target.src,
        lightboxImageTitle = event.target.id;
    window.buildLightbox(lightboxImageSrc, photos, lightboxImageTitle);
}

// Build the DOM elements that make up the lightbox gallery
function buildLightbox(lightboxImageSrc, photos, lightboxImageTitle) {

    // Create semi-opaque background that covers the whole photogrid
    var background = document.createElement("div");
    background.className = "lightboxBackground";
    document.body.appendChild(background);

    // Create container for the image, make it visible
    var container = document.createElement("div");
    container.id = "container";
    container.className = "lightboxContainer";
    container.style.visibility = "visible";
    document.body.appendChild(container);

    // Create single large lightbox image and add it to container
    var image = document.createElement("img");
    image.src = lightboxImageSrc;
    image.id = lightboxImageTitle + "lightbox";
    image.className = "lightboxImage";
    container.appendChild(image);

    // Create lightbox image title and add it to container
    var title = document.createElement("p");
    title.id = "title";
    title.className = "lightboxTitle";
    title.textContent = lightboxImageTitle;
    container.appendChild(title);

    // Create left navigation arrow and add it to container
    var leftArrow = document.createElement("img");
    leftArrow.src = "../img/leftArrow.png";
    leftArrow.id = lightboxImageTitle + "leftarrow";
    leftArrow.className = "leftArrow";
    leftArrow.style.marginTop = -(image.height + (image.height / 3)) / 2;
    leftArrow.style.marginLeft = 5;
    container.appendChild(leftArrow);

    // Create right navigation arrow and add it to container
    var rightArrow = document.createElement("img");
    rightArrow.src = "../img/rightArrow.png";
    rightArrow.className = "rightArrow";
    rightArrow.id = lightboxImageTitle + "rightarrow";
    rightArrow.style.marginTop = -(image.height + (image.height / 3)) / 2;
    rightArrow.style.marginLeft = image.width - 65;
    container.appendChild(rightArrow);

    // Center the lightbox container
    container.style.marginTop = -image.height / 2 + window.pageYOffset;
    container.style.marginLeft = -image.width / 2;

    // Prevent scrolling while lightbox image is displayed
    document.body.style.overflowY = "hidden";

    // When the mouse enters the lightbox container, make navigation arrows visible
    document.getElementById('container').onmousemove = function() {
        rightArrow.style.visibility = "visible";
        leftArrow.style.visibility = "visible";
    }

    // When the mouse leaves the lightbox container, hide navigation arrows
    document.getElementById('container').onmouseout = function() {
        rightArrow.style.visibility = "hidden";
        leftArrow.style.visibility = "hidden";
    }
}

/* Enable navigation through image gallery via clicking on navigation arrows. */

var increment = 0,
    atBeginning = false,
    atEnd = false;

// If left arrow is clicked, move to previous photo; if right arrow is clicked, move to next photo.
// e: event that triggers this function call
function iterateThroughGallery(e, photos) {
    if (e.target.className == "leftArrow" && atBeginning == false) {
        increment--;
        atEnd = false;
        for (var i = 0; i < photos.length; i++) {
            if (e.target.id == photos[i].title + "leftarrow") {
                buildNextImage(i, photos, increment);
            }
        }
    }

    if (e.target.className == "rightArrow" && atEnd == false) {
        increment++;
        atBeginning = false;
        for (var i = 0; i < photos.length; i++) {
            if (e.target.id == photos[i].title + "rightarrow" && i != photos.length - 1) {
                buildNextImage(i, photos, increment, e);
            }
        }
    }
}

// Set parameters for the next image to be displayed and re-position the container
// e: the event that triggered this function call
function buildNextImage(i, photos, increment, e) {
    var photo = photos[i + increment],
        image = document.getElementById(photos[i].title + "lightbox"),
        src = "http://farm" +
              photo.farm +
              ".static.flickr.com/" +
              photo.server +
              "/" +
              photo.id +
              "_" +
              photo.secret +
              ".jpg";
    image.src = src;
    var caption = document.getElementById("title");
    caption.innerHTML = photo.title;

    // Re-position the container and arrows, since the image has updated
    var container = document.getElementById("container");
    container.style.marginTop = -image.height / 2 + window.pageYOffset;
    container.style.marginLeft = -image.width / 2;
    var leftArrow = document.getElementById(photos[i].title + "leftarrow");
    leftArrow.style.marginTop = -(image.height + (image.height / 3)) / 2;
    leftArrow.style.marginLeft = 5;
    var rightArrow = document.getElementById(photos[i].title + "rightarrow");
    rightArrow.style.marginTop = -(image.height + (image.height / 3)) / 2;
    rightArrow.style.marginLeft = image.width - 65;

    var previous = document.getElementById(photo.title);
    if (previous.id == photos[photos.length - 1].title) {
        atEnd = true;
    }
    if (previous.id == photos[0].title) {
        atBeginning = true;
    }
}

// Removes background and container from DOM when lightbox is active and background is clicked
// e: event that triggers this function call
function backgroundClicked(e) {
    if (e.target.className == "lightboxBackground") {
        e.target.parentNode.removeChild(e.target);
        container.parentNode.removeChild(document.getElementById("container"));
        document.body.style.overflow = "auto";
        increment = 0;
        atEnd = false;
    }
}
