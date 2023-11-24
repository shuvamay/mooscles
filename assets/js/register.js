// Get references to the modal and open button
var modal = document.getElementById("registration-modal");
var openButton = document.getElementById("openRegistrationButton");

// When the user clicks the button, open the modal
openButton.onclick = function () {
  // Target the container with class "container" and set its display to "block"
  var container = document.querySelector(".container");
  container.style.display = "block";

  // Display the modal
  modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    // Target the container with class "container" and set its display to "none"
    var container = document.querySelector(".container");
    container.style.display = "none";

    // Hide the modal
    modal.style.display = "none";
  }
};

document.getElementById("register").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the form from submitting
  alert("Form submitted!");
});
