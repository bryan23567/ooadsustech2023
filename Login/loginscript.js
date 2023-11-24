
import { uri_api } from "../global.js";
// import { setUserInfo, getUserInfo } from "../global.js";
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


document.addEventListener("DOMContentLoaded", function () {
  // Get references to form elements
  const loginForm = document.querySelector(".login-form");
  const schoolIdInput = document.getElementById('school-id');
  const passwordInput = document.getElementById('password');

  loginForm.addEventListener("submit", function (e) {
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
      credentials: "include",
   
      
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        // Log the headers
        console.log("Response Headers:", response.headers );
        if (response.headers.has('Set-Cookie')) {
          console.log('Set-Cookie header exists');

          // You can also get the value of the "Set-Cookie" header
          const cookieValue = response.headers.get('Set-Cookie');
          console.log('Set-Cookie Value:', cookieValue);
        } else {
          console.log('Set-Cookie header does not exist');
        }

        if (response.headers.has('Content-Length')) {
          // Get the value of the "Content-Length" header
          const contentLength = response.headers.get('Content-Length');
          console.log('Content-Length:', contentLength);

          // You may want to convert the value to a number if needed
          const contentLengthNumber = parseInt(contentLength, 10);
          console.log('Content-Length as Number:', contentLengthNumber);

          // Now you can use contentLengthNumber in your logic
        } else {
          console.log('Content-Length header does not exist');
        }

        // Parse the response as JSON
        return response.json();
      })
      .then(responseData => {
        // Handle the response from the backend
        console.log("API Response:", responseData);

        if (responseData.sid == data.sid && responseData.password == responseData.password) {
          // Login was successful

          // userInfo.password = responseData.password;
          // userInfo.sid = responseData.sid;
          // userInfo.userName = responseData.name;

          localStorage.setItem('username', responseData.name);
          localStorage.setItem('sid', responseData.sid);
          localStorage.setItem('password', responseData.password);

          // setUserInfo(responseData.name, responseData.sid, responseData.password);

          // console.log('Global User Info: ', getUserInfo());

          // Swal.fire({
          //   icon: 'success',
          //   title: 'Login Successful!',
          //   text: 'You are now logged in!',
          // })
          // .then((result) => {
          //   if (result.isConfirmed) {
          //     // Redirect to a new page

          //     window.location.href = '../dashboard/coordinates.html'; // homepage
          //   }
          // });
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

    // axios.post(uri_api + '/api/login', data, {
    //   withCredentials: true,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => {
    //   // Log the response headers
    //   console.log('Response Headers:', response.headers);

    //   // Check for the 'Set-Cookie' header
    //   if (response.headers['set-cookie']) {
    //     console.log('Set-Cookie header exists');
        
    //     // Access the 'Set-Cookie' header value
    //     const cookieValue = response.headers['set-cookie'];
    //     console.log('Set-Cookie Value:', cookieValue);
    //   } else {
    //     console.log('Set-Cookie header does not exist');
    //   }

    //   // Handle the response data
    //   console.log('API Response:', response.data);

    //   if (response.data.sid === data.sid && response.data.password === responseData.password) {
    //     // Login was successful
    //     localStorage.setItem('username', response.data.name);
    //     localStorage.setItem('sid', response.data.sid);
    //     localStorage.setItem('password', response.data.password);

    //     // Perform any actions upon successful login
    //   } else {
    //     // Login failed
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Login Failed!',
    //       text: 'Your SID or password is not correct!',
    //     });
    //   }
    // })
    // .catch(error => {
    //   // Handle any network or request errors
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Request Failed',
    //     text: 'An error occurred while processing your request.',
    //   });
    //   console.error('Request failed:', error);
    // });
  });
});



