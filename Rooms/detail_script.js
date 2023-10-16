// Link to the Backend API
// ------------------------------------------------------------------------------------------------------
import { uri_api } from "../global.js";

const queryParams = new URLSearchParams(window.location.search);
const buildingID = queryParams.get("buildingId");

console.log('hellos')
const apiUrl = uri_api + '/api/building/' + buildingID;

showLoadingScreen();
var buildingId;
var pictureId;
var facilities;
var plan;

// Find the "Map" link by its ID
const mapLink = document.getElementById('map-link');

// Set the href attribute to the dynamic URL
mapLink.href = `../Rooms/map.html?buildingId=` + buildingID; 


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

        console.log('Response Body For Details:', data);

        // Display building information on the page
        //displayBuildingInfo(data);
        buildingId = data.buildingId;
        pictureId = data.pictureId;
        facilities = data.facilities;
        plan = data.plan;
        displayBuildingName(data.name);
        displayBuildingLocation(data.location);
        displayFacilityBuildingTable(data.facilities);
        displayPlanBuildingTable(data.plan);

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


function displayBuildingName(name) {
    var building_name = document.getElementById("building-name");
    building_name.innerHTML = name;
}


function displayBuildingLocation(location) {
    var building_locs = document.getElementsByClassName('building-loc');

    for (var i = 0; i < building_locs.length; i++) {
        building_locs[i].innerHTML = location;
    }
}


function displayFacilityBuildingTable(facilities) {
    var tableBody = document.querySelector('.table-building');

    facilities.forEach(function (facility, index) {
        var newRow = document.createElement("tr");

        var facilityName = facility.name;
        var facilityLoc = facility.location;

        newRow.innerHTML = `
            <td>${facilityName}</td>
            <td>${facilityLoc}</td>
            <td>
            <button class="delete-building-facility" data-facility-id="${index}">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });

    // Add click event listeners to the "Delete" buttons;
    var deleteButtons = document.querySelectorAll('.delete-building-facility');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', deleteFacility); //???
    });
}


// Function to handle the delete operation
function deleteFacility(event) {
    const facilityId = event.target.getAttribute('data-facility-id');
    console.log(facilityId);

    Swal.fire({
        title: 'Delete Facility',
        text: 'Are you sure you want to delete this facility?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            // Make a DELETE request to your server to delete the facility by facilityId
            fetch(uri_api + `/api/deleteBuildingFacilities`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    buildingFacilitiesId: facilities[facilityId].buildingFacilitiesId,
                    buildingId: buildingId,
                }),
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Optionally, parse the response JSON if needed
            })
            .then(function(data) {
                // Handle the successful deletion on the client-side
                event.target.closest('tr').remove(); // Remove the row from the table
                console.log('Facility deleted:', data);
                Swal.fire('Deleted!', 'The facility has been deleted.', 'success');
                reloadWebsite();
            })
            .catch(function(error) {
                // Handle errors here
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire('Error', 'An error occurred while deleting the facility.', 'error');
            });
        }
    });
}



function displayPlanBuildingTable(plans) {
    var tableBody = document.querySelector('.plans-table tbody');

    plans.forEach(function (plan, index) {
        var newRow = document.createElement('tr');

        var planName = plan.plan;
        var planLoc = plan.location;

        newRow.innerHTML = `
            <td>${planName}</td>
            <td>${planLoc}</td>
            <td>
                <button class="delete-building-plan" data-plan-id="${index}">Delete</button><br>
            </td>
        `;
        console.log(planName);
        console.log(planLoc);

        tableBody.appendChild(newRow);
    });

    var deleteButtons = document.querySelectorAll('.delete-building-plan');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', deletePlan);
    });
}

function deletePlan(event) {
    const planId = event.target.getAttribute('data-plan-id');
    console.log(planId);

    Swal.fire({
        title: 'Delete Plan',
        text: 'Are you sure you want to delete this plan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            // Make a DELETE request to your server to delete the plan by planId
            fetch(uri_api + `/api/deleteBuildingPlans`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: plan[planId].planId, // Use plans[planId] to access the plan object
                    buildingId: buildingId,
                }),
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Optionally, parse the response JSON if needed
            })
            .then(function(data) {
                // Handle the successful deletion on the client-side
                event.target.closest('tr').remove(); // Remove the row from the table
                console.log('Plan deleted:', data);
                Swal.fire('Deleted!', 'The plan has been deleted.', 'success');
                reloadWebsite();
            })
            .catch(function(error) {
                // Handle errors here
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire('Error', 'An error occurred while deleting the plan.', 'error');
            });
        }
    });
}



// var img_upload;
function displayBuildingPicture(pictures) {
    const imageIds = ['image1', 'image2', 'image3']; // IDs of the <img> elements

    imageIds.forEach((imageId, index) => {
        const pictureData = pictures[`picture${index + 1}`]; // Access picture1, picture2, picture3
        const imgElement = document.getElementById(imageId);

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
    });
}


function editPic() {
    console.log('Edit Pic');
    Swal.fire({
        title: '<strong>Upload Pictures</strong>',
        html:
            `
        <form id="imageUploadForm" enctype="multipart/form-data">
            <label for="imageInput1">Select Picture 1:</label>
            <input type="file" id="imageInput1" name="image1" accept="image/*">
            
            <label for="imageInput2">Select Picture 2:</label>
            <input type="file" id="imageInput2" name="image2" accept="image/*">
            
            <label for="imageInput3">Select Picture 3:</label>
            <input type="file" id="imageInput3" name="image3" accept="image/*">
        </form>
        <div id="selectedFiles"></div>
        `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton: true,
        preConfirm: () => {
            const selectedImages1 = document.getElementById('imageInput1').files;
            const selectedImages2 = document.getElementById('imageInput2').files;
            const selectedImages3 = document.getElementById('imageInput3').files;

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

            // Use Promise.all to convert all selected images to base64
            return Promise.all([
                fileToBase64(selectedImages1[0]),
                fileToBase64(selectedImages2[0]),
                fileToBase64(selectedImages3[0]),
            ])
                .then((result) => {
                    const [base64Image1, base64Image2, base64Image3] = result;

                    console.log("base64Image1", base64Image1);
                    console.log("base64Image2", base64Image2);
                    console.log("base64Image3", base64Image3);

                    // Create a JSON object containing your data with base64 images
                    const jsonData = {
                        pictureId: pictureId,
                        picture1: base64Image1,
                        picture2: base64Image2,
                        picture3: base64Image3,
                        buildingId: buildingId
                    };

                    // Convert JSON object to a JSON string
                    const jsonString = JSON.stringify(jsonData);

                    console.log("jsonString:", jsonString);

                    // Make a POST request to send the JSON string to the backend
                    return fetch(uri_api + '/api/uploadBuildingImages', {
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
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Uploaded!',
                'Your images have been uploaded.',
                'success'
            );
            reloadWebsite();
        } else if (result.isDismissed) {
            Swal.fire(
                'Cancelled',
                'You cancelled the upload.',
                'info'
            );
        }
    });
}


// Add an event listener to the button that triggers the editPic function
document.getElementById('editPicBtn').addEventListener('click', editPic);

function displayPictures(pictureUrls) {
    const imageContainer = document.getElementById('imageContainer'); // Change 'imageContainer' to the ID of your image container element

    // Clear any existing images in the container
    imageContainer.innerHTML = '';

    // Loop through the array of picture URLs
    pictureUrls.forEach((imageUrl) => {
        // Create an image element
        const image = document.createElement('img');

        // Set the source (URL) of the image
        image.src = imageUrl;

        // Set any additional attributes or styles for the image if needed
        // image.setAttribute('alt', 'Image Alt Text'); // Example: Setting alt text

        // Append the image to the image container
        imageContainer.appendChild(image);
    });
}

function displayAddFacilityBuilding() {
    Swal.fire({
        title: 'Add Facility',
        html: `
            <form id="facility-building-form">
                <label for="facility-name-building">Name:</label>
                <input type="text" id="facility-name-building" name="facility-name-building" required>
                <br>
                <label for="facility-building-location">Location:</label>
                <input type="text" id="facility-building-location" name="facility-building-location" required>
            </form>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton: true,
        preConfirm: () => {
            const nameInput = document.getElementById('facility-name-building').value;
            const locFacilitytInput = document.getElementById('facility-building-location').value;

            // You can perform input validation here if needed

            // Create an object with the form data
            const formData = {
                buildingId: buildingId,
                buildingFacilitiesId: null,
                name: nameInput,
                location: locFacilitytInput,
            };

            // Make a POST request to your server
            return fetch(uri_api + '/api/editBuildingFacilities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the response JSON if needed
                })
                .then((data) => {
                    // Handle the response from the server as needed
                    console.log('Response:', data);

                    // Optionally, you can perform additional actions after a successful POST request
                    return data; // This will close the SweetAlert2 modal
                })
                .catch((error) => {
                    // Handle errors here
                    console.error('There was a problem with the fetch operation:', error);
                    Swal.showValidationMessage('An error occurred. Please try again.');
                });
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Success!', 'Facility added successfully.', 'success');
            reloadWebsite();
        }
    });
}

// Add an event listener to the button to trigger the SweetAlert2 modal
document.getElementById('add-facilities-building').addEventListener('click', displayAddFacilityBuilding);





function displayAddPlan() {
    Swal.fire({
        title: 'Add Plan',
        html: `
            <form id="plan-building-form">
                <label for="plan-name-building">Plan:</label>
                <input type="text" id="plan-name-building" name="plan-name-building" required>
                <br>
                <label for="loc-plan">Location:</label>
                <input type="text" id="loc-plan" name="loc-plan" required>
            </form>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton: true,
        preConfirm: () => {
            const planNameInput = document.getElementById('plan-name-building').value;
            const locationInput = document.getElementById('loc-plan').value;

            // You can perform input validation here if needed

            // Create an object with the form data
            const formData = {
                buildingId: buildingId,
                planId: null,
                plan: planNameInput,
                location: locationInput,
            };

            // Make a POST request to your server
            return fetch(uri_api + '/api/editBuildingPlans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the response JSON if needed
                })
                .then((data) => {
                    // Handle the response from the server as needed
                    console.log('Response:', data);

                    // Optionally, you can perform additional actions after a successful POST request
                    return data; // This will close the SweetAlert2 modal
                })
                .catch((error) => {
                    // Handle errors here
                    console.error('There was a problem with the fetch operation:', error);
                    Swal.showValidationMessage('An error occurred. Please try again.');
                });
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Success!', 'Plan added successfully.', 'success');
            reloadWebsite();
        }
    });
}

// Add an event listener to the button to trigger the SweetAlert2 modal
document.getElementById('addPlan').addEventListener('click', displayAddPlan);



function displayEditLocation(){
    Swal.fire({
        title: 'Edit Building Location',
        html: `
            <form id="building-location-form">
                <label for="location-building">Location:</label>
                <input type="text" id="location-building" name="location-building" required>
            </form>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton: true,
        preConfirm: () => {
            const locationInput = document.getElementById('location-building').value;

            // You can perform input validation here if needed

            // Create an object with the form data
            const formData = {
                location: locationInput,
                buildingId: buildingId
            };

            // Make a POST request to your server to update the location
            return fetch(uri_api + '/api/editBuildingLocation', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse the response JSON if needed
                })
                .then((data) => {
                    // Handle the response from the server as needed
                    console.log('Response:', data);

                    // Reload the website upon successful editing
                    if (data.success) {
                        reloadWebsite();
                    }

                    return data; // This will close the SweetAlert2 modal
                })
                .catch((error) => {
                    // Handle errors here
                    console.error('There was a problem with the fetch operation:', error);
                    Swal.showValidationMessage('An error occurred. Please try again.');
                });
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Success!', 'Location editted successfully.', 'success');
            reloadWebsite();
        }
    });
}
document.getElementById('edit-desc-button').addEventListener('click', displayEditLocation);
