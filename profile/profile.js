
import { uri_api } from "../global.js";
const queryParams = new URLSearchParams(window.location.search);
const SID = queryParams.get("sid");

console.log('Profile!')
const apiUrl = uri_api + '/api/userProfile/cbb10e07-89ee-4f15-b451-4ef706bd141d';
const apiUrlColleges = uri_api + '/api/getAllColleges';

showLoadingScreen();

var uuid;
var colleges;
var sid;
var user;
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
    sid = data.sid;
    user = data;

    console.log(uuid);
    console.log(SID);
    
    displayUserInformation(data);
    displayProfilePicture(data.photo);
    displayChangePassword(data.password);


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
  // Format the dateOfBirth
  const dateOfBirth = new Date(user.dateOfBirth);
  const formattedDate = dateOfBirth.toISOString().split('T')[0];

  dateOfBirthAbout.textContent = formattedDate;

  genderAbout.textContent = user.gender == 0 ? 'Female' : 'Male';
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

      updatedName.value = user.name;
      updatedSid.value = user.sid;
      updatedDob.value = user.dateOfBirth;
      updatedGender.value = user.gender == 0 ? 'Female' : 'Male';
      updatePreference.value = user.preferences;
      updatedGrade.value = user.grade;
      

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
const fileInput = document.getElementById('upload-profile');



function uploadProfilePic() {
  Swal.fire({
    title: '<strong>Upload Profile Picture</strong>',
    html: `
      <form id="imageUploadForm" enctype="multipart/form-data">
        <label for="imageInput">Select Picture:</label>
        <input type="file" id="imageInput" name="image" accept="image/*">
      </form>
      <div id="selectedFiles"></div>
    `,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    showConfirmButton: true,
    preConfirm: () => {
      const selectedImage = document.getElementById('imageInput').files[0];

      if (!selectedImage) {
        // Handle the case where no image is selected
        return Promise.reject('No image selected');
      }

      // Function to convert File to base64
      function fileToBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = function () {
            resolve(reader.result.split(',')[1]); // Extract base64 data
          };
          reader.onerror = function (error) {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      }

      return fileToBase64(selectedImage)
        .then((base64Image) => {
          // Create a JSON object containing your data with base64 image
          const jsonData = {
            photo: base64Image,
          };

          // Convert JSON object to a JSON string
          const jsonString = JSON.stringify(jsonData);

          // Make a POST request to send the JSON string to the backend
          return fetch(uri_api + '/api/updateUserProfilePhoto/' + uuid, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonString,
          });
        })
        .then((response) => {
          if (!response.ok) {
            console.log(response.body);
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response JSON if needed
        })
        .catch((error) => {
          // Handle errors here
          console.error('There was a problem with the fetch operation:', error);
        });
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Uploaded!',
        'Your image has been uploaded.',
        'success'
      );
      // reloadWebsite();
    } else if (result.isDismissed) {
      Swal.fire(
        'Cancelled',
        'You cancelled the upload.',
        'info'
      );
    }
  });
}



fileInput.addEventListener('click', uploadProfilePic);

function displayProfilePicture(pictures) {
  
  const pictureData = pictures;
  const imgElement = document.getElementById("profile-picture");

  if (pictureData && pictureData.data) {
      // Convert the byte array to a binary string
      const byteArray = new Uint8Array(pictureData.data);
      let binaryString = '';
      byteArray.forEach(byte => {
          binaryString += String.fromCharCode(byte);
      });

      const base64Data = btoa(binaryString);
      const decodedData = atob(base64Data);
      const dataUrl = `data:image/png;base64,${decodedData}`;

      // Display the image using the HTML img element
      imgElement.src = dataUrl;
  } else {
      // Handle the case where the picture data is empty or missing
      imgElement.alt = 'Image not available';
      imgElement.src = ''; // You can set a placeholder image or leave it empty
  }

}

function displayChangePassword(password) {
  Swal.fire({
      title: 'Update Password',
      html:
          `
          <div class="form">
              <div class="form-element">
                  <label for="fullname">Old Password</label>
                  <input type="password" id="old-password" placeholder="Old Password" required>
              </div>
              <div class="form-element">
                  <label for="date-of-birth">New Password</label>
                  <input type="password" id="new-password" placeholder="New Password" required>
              </div>
              <div class="form-element">
                  <label for="grade">Rewrite New Password</label>
                  <input type="password" id="confirm-password" placeholder="Confirm New Password" required>
              </div>
          </div>
          `,
      showCancelButton: true,
      confirmButtonText: 'Change Password',
      preConfirm: () => {
          const oldPassword = document.getElementById('old-password').value;
          const newPassword = document.getElementById('new-password').value;
          const confirmPassword = document.getElementById('confirm-password').value;

          if (newPassword !== confirmPassword) {
              Swal.showValidationMessage('New passwords do not match.');
          } else {
              
              if (oldPassword == password) { // Replace 'yourOldPassword' with the actual old password check
                  return fetch(uri_api + '/api/updateUserProfilePhoto/' + uuid, {
                      method: 'POST',
                      body: JSON.stringify({ oldPassword, newPassword }),
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  })
                      .then(response => {
                          if (!response.ok) {
                              throw new Error('Network response was not ok');
                          }
                          return response.json();
                      })
                      .catch(error => {
                          Swal.showValidationMessage(`Password change failed: ${error.message}`);
                      });
              } else {
                  Swal.showValidationMessage('Incorrect old password.');
              }
          }
      },
  }).then(result => {
      if (result.isConfirmed) {
          Swal.fire('Password Changed', 'Your password has been updated successfully.', 'success');
      }
  });
}

document.getElementById('change-password').addEventListener('click', displayChangePassword);