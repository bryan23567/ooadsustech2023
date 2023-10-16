
import { uri_api } from "../global.js";
const queryParams = new URLSearchParams(window.location.search);
const SID = queryParams.get("sid");
console.log('Profile!')
const apiUrl = uri_api + '/api/userProfile/' + SID;

showLoadingScreen();
// Define the headers for the request
const headers = new Headers({
  'Content-Type': 'application/json',
});

// Create the request object
const getRequest = new Request(apiUrl, {
  method: 'GET',
  headers: headers,
});

// Make the API request using the Fetch API
fetch(getRequest)
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response JSON
  })
  .then(data => {
      // Print the response body
      hideLoadingScreen();

      console.log('Response Body For Profile:', data);

      displayUserInformation(data);

      

      if(data.picture != null){
          displayBuildingPicture(data.picture);
      }

      // Print the status code
      console.log('Status Code:', data.status);
  })
  .catch(error => {

      hideLoadingScreen();
      // Handle errors here

      alert("Please Contact Anthony Bryan for further support!");
      console.error('There was a problem with the fetch operation:', error);
  });

  // Function to show the loading screen
function showLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'block';
}

function reloadWebsite() {
  location.reload();
}

// Function to hide the loading screen
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'none';
}


const btnUpdateInfo = document.querySelector("#showupdate");
const btnClose = document.querySelector(".close-btn");
const bgPopUp = document.querySelector(".bg-pop-up");

btnUpdateInfo.addEventListener("click", showPopUp);
btnClose.addEventListener("click", closePopUp);

function showPopUp() {
  document.querySelector(".popup").classList.add("active");
  bgPopUp.style.display = "block";
}

function closePopUp() {
  document.querySelector(".popup").classList.remove("active");
  bgPopUp.style.display = "none";
}



function displayUserInformation(user) {
  // Assuming you have HTML elements with specific IDs to display user information
  const nameAbout = document.getElementById('fullname-about');
  const sidAbout = document.getElementById('studentid-about');
  const dateOfBirthAbout = document.getElementById('birth-about');
  const genderAbout = document.getElementById('gender-about');
  const preferencesAbout = document.getElementById('preference-about');
  const gradeAbout = document.getElementById('grade-about');
  const ageAbout = document.getElementById('age-about');
  const residentalCollege = document.getElementById('residential-about');

  
  nameAbout.textContent = user.name;
  sidAbout.textContent = user.sid;
  dateOfBirthAbout.textContent = user.dateOfBirth;
  genderAbout.textContent = user.gender === 0 ? 'Female' : 'Male';
  preferencesAbout.textContent = user.preferences;
  gradeAbout.textContent = user.grade;
  ageAbout.textContent = user.age;
  residentalCollege.textContent = user.collage.name;



  const fullNameBar = document.getElementById('fullname-bar');
  const sidBar = document.getElementById('studentid-bar');
  const gradeBar = document.getElementById('grade-bar');
  const residentialBar = document.getElementById('residential-bar');

  fullNameBar.textContent = user.name;
  sidBar.textContent = user.sid;
  gradeBar.textContent = user.grade;
  residentialBar.textContent = user.collage.name;
}

function updateInformation() {
  // Capture the updated data from HTML elements
  const updatedName = document.getElementById('fullname-update').value;
  const updatedSID = document.getElementById('studentid-update').value;
  const updatedDateOfBirth = document.getElementById('birth-update').value;
  const updatedGender = document.querySelector('gender-update').value;
  const updatedPreferences = document.getElementById('preference-update').value;
  const updatedGrade = document.getElementById('grade-update').value;
  const updatedResidentalCollege = document.getElementById('residential-update').value;

  // Construct the data object to send in the POST request
  const updatedUserData = {
    name: updatedName,
    sid: updatedSID,
    dateOfBirth: updatedDateOfBirth,
    gender: updatedGender,
    preferences: updatedPreferences,
    grade: updatedGrade,
    residentalCollege: updatedResidentalCollege,
  };

  // Send a POST request to update the user's information
  fetch(uri_api + '', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response JSON
    })
    .then(data => {
      // Handle success, e.g., close the popup or show a success message
      closePopUp(); // Close the popup after successful update
    })
    .catch(error => {
      // Handle errors, e.g., display an error message to the user
      console.error('There was a problem with the update operation:', error);
    });
}


