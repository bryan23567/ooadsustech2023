
import { uri_api } from "../global.js";
console.log("Login Page!");
console.log(uri_api)

// hidden the password
function showPassword() {
    var passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

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


document.addEventListener("DOMContentLoaded", function() {
    // Get references to form elements
    const loginForm = document.querySelector(".login-form");
    const schoolIdInput = document.getElementById('school-id');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent the default form submission
  
      // Get the values from the form inputs
      const schoolId = schoolIdInput.value;
      const password = passwordInput.value;
  
      // Create an object with the data to send
      const data = {
        sid: schoolId,
        password: password
      };
      console.log(data);

      // Make a POST request to send the data to the backend
      fetch(uri_api + '/api/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(responseData => {
        // Handle the response from the backend
        console.log("API Response:", responseData);

        if (responseData.sid == data.sid && responseData.password == responseData.password) {
          // Login was successful
          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            text: 'You are now logged in!',
          })
          .then((result) => {
            if (result.isConfirmed) {
              // Redirect to a new page
              window.location.href = '../dashboard/coordinates.html'; // homepage
            }
          });
        } else {
          // Login failed
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            text: 'Your SID or password is not correct!',
          });
        }
      })
      .catch(error => {
        // Handle any network or request errors
        Swal.fire({
          icon: 'error',
          title: 'Request Failed',
          text: 'An error occurred while processing your request.',
        });
        console.error("Request failed:", error);
      });
    });
});

  

