
import { uri_api } from "../global.js";
const queryParams = new URLSearchParams(window.location.search);
const SID = queryParams.get("sid");

console.log('Profile!')
const apiUrl = uri_api + '/api/userProfile/cbb10e07-89ee-4f15-b451-4ef706bd141d';
const apiUrlColleges = uri_api + '/api/getAllColleges';

showLoadingScreen();

var uuid;
var colleges;

// Define the headers for the request
const headers = new Headers({
  'Content-Type': 'application/json',
});


// Create the request objects
const getRequest = new Request(apiUrl, {
  method: 'GET',
  headers: headers,
});

// Make the first API request using the Fetch API
fetch(getRequest)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response JSON
  })
  .then(data => {
    // Print the response body
    console.log('Response Body For Profile:', data);
    

    uuid = data.uuid;

    console.log(uuid);
    displayUserInformation(data);
    displayProfilePicture(data.photo);

    // Print the status code
    console.log('Status Code:', data.status);
  })
  .catch(error => {
    // Handle errors here
    alert('Please Contact Anthony Bryan for further support!');
    console.error('There was a problem with the fetch operation:', error);
  });


const getRequestColleges = new Request(apiUrlColleges, {
  method: 'GET',
  headers: headers,
});

// Make the second API request using the Fetch API
fetch(getRequestColleges)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response JSON
  })
  .then(collage => {
    // Print the response body
    console.log('Response Body For Colleges:', collage);
    colleges = collage;

    console.log('Colleges: ', colleges);

    // Print the status code
    console.log('Status Code:', collage.status);
  })
  .catch(error => {
    // Handle errors here
    alert('Please Contact Anthony Bryan for further support!');
    console.error('There was a problem with the fetch operation:', error);
  })
  .finally(() => {
    // This will ensure that hideLoadingScreen is called regardless of success or error
    hideLoadingScreen();
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
  Swal.fire({
    title: 'Update Information',
    html: `
    <div class="form">
        <div class="form-element">
            <label for="fullname">Full Name</label>
            <input type="text" id="fullname-update" placeholder="Enter Fullname">
        </div>
        <div class="form-element">
            <label for="date-of-birth">Date of birth</label>
            <input type="date" id="birth-update" placeholder="Enter date of birth">
        </div>
        <div class="form-element">
            <label for="grade">Grade</label>
            <input type="text" id="grade-update" placeholder="Enter grade">
        </div>
        <div class="form-element">
            <label for="gender">Gender</label>
            <input type="radio" id="male" name="gender-update" value=1>
            <label for="male">Male</label>
            <input type="radio" id="female" name="gender-update" value=0>
            <label for="female">Female</label>
        </div>
        <div class="form-element">
            <label for="student-id">Student ID</label>
            <input type="text" id="sid-update" placeholder="Enter Student ID">
        </div>
        <div class="form-element">
            <label for="preference">Preference</label>
            <input type="text" id="preference-update" placeholder="Enter Preference">
        </div>
        <div class="form-element">
            <label for="residential-college">Residential College</label>
            <select id="residential-update">
              
            </select>
        </div>
    </div>
    `,
    didOpen: () => {
      const collageName = document.getElementById('residential-update');

      // Clear any existing options
      collageName.innerHTML = '';

      // Iterate through the 'colleges' array and create an option element for each college
      colleges.forEach(college => {
        const option = document.createElement('option');
        option.value = college.collageId; // Set the 'value' attribute
        option.text = college.name; // Set the text that will be displayed
        collageName.appendChild(option); // Append the option to the select element
      });
    },
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: 'Submit',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      // Capture the updated data from the Swal dialog
      const updatedName = document.getElementById('fullname-update').value;
      const updatedDob = document.getElementById('birth-update').value;
      const updatedGrade = document.getElementById('grade-update').value;
      const updatedGender = document.querySelector('input[name="gender-update"]:checked').value;
      const updatedSid = document.getElementById('sid-update').value;
      const updatePreference = document.getElementById('preference-update').value;
      const collageId = document.getElementById('residential-update').value;
      
      console.log(colleges);
      

      const formData = {
        name: updatedName,
        dateOfBirth: updatedDob,
        grade: updatedGrade,
        gender: updatedGender,
        sid: updatedSid,
        preferences: updatePreference,
        collageId: collageId,
      };

      // Send a POST request to update the user's information
      return fetch(uri_api + '/api/updateUserProfile/' + uuid, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw Error('Network response was not ok');
          }
          return response.json();
        })
        .catch(error => {
          Swal.showValidationMessage(`Request failed: ${error.message}`);
        });
    },
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire('Updated', 'Your information has been updated.', 'success');
      reloadWebsite();
    }
  });
}

document.getElementById('showupdate').addEventListener('click', updateInformation);




//upload profile picture
const profilePicture = document.getElementById('profile-picture');
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', function () {
  Swal.fire({
    title: 'Confirm Image Upload',
    text: 'Are you sure you want to upload this image?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Upload',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
          profilePicture.src = e.target.result;

          // Send the image to the server using a POST request
          const dataUrl = e.target.result;
          const formData = new FormData();
          formData.append('profileImage', dataUrl);

          fetch(uri_api + '/api/updateUserProfilePhoto/' + SID, {
            method: 'POST',
            body: formData,
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              // Display a success message with Swal
              Swal.fire({
                icon: 'success',
                title: 'Image uploaded successfully',
              });
            })
            .catch(error => {
              // Display an error message with Swal
              Swal.fire({
                icon: 'error',
                title: 'Image upload failed',
                text: error.message,
              });
              console.error('There was a problem uploading the image:', error);
            });
        };
        reader.readAsDataURL(file);
      }
    }
  });
});

function displayProfilePicture(imageUrl) {
  const profilePicture = document.getElementById('profile-picture');
  profilePicture.src = imageUrl;
}
