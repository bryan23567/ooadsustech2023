document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Get the values of the SID and password fields
        const email = document.getElementById("school-id").value;
        const password = document.getElementById("password").value;

        // Create a JSON object with the SID and password
        const data = {
            email: email,
            password: password
        };

        // Send a POST request with the JSON data
        fetch("https://testingserver-2vc6.onrender.com/api/fakelogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            // Handle the API response here
            console.log("API Response:", responseData);
            console.log(responseData.role);
            
            if(responseData.error){
                alert("Login Failed: " + responseData.error);
            } else{
                console.log("Login Successful!");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});
