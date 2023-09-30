// Link to the Backend API
// ------------------------------------------------------------------------------------------------------
import { uri_api } from "../global.js";

console.log('hellos')
const apiUrl = uri_api + '/api/building/6cf4a19e-d547-4e00-b2b2-cb44e1cd3123';

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

        console.log('Response Body:', data);

        // Display building information on the page
        //displayBuildingInfo(data);
        displayBuildingName(data.name);
        displayBuildingLocation(data.location);
        displayFacilityBuildingTable(data.facilities);
        displayPlanBuildingTable(data.plan);
        displayBuildingPicture(data.picture);

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
    var tableBody = document.querySelector('.table-building tbody');

    facilities.forEach(function (facility) {
        var newRow = document.createElement("tr");

        var facilityName = facility.name;
        var facilityLoc = facility.location;

        newRow.innerHTML = `
            <td>${facilityName}</td>
            <td>${facilityLoc}</td>
            <td>
                <button class="delete" onclick="deleteRow(this)">Delete</button><br>
            </td>
        `;

        tableBody.appendChild(newRow);
    });
}


function displayPlanBuildingTable(plans) {
    var tableBody = document.querySelector('.plans-table tbody');

    plans.forEach(function (plan) {
        var newRow = document.createElement('tr');

        var planName = plan.plan;
        var planLoc = plan.location;

        newRow.innerHTML = `
            <td>${planName}</td>
            <td>${planLoc}</td>
            <td>
                <button class="delete" onclick="deleteRow(this)">Delete</button><br>
            </td>
        `;

        tableBody.appendChild(newRow);
    });
}


function displayBuildingPicture(pictures) {
    // Get references to the img elements by their IDs
    var img1 = document.getElementById('image1');
    var img2 = document.getElementById('image2');
    var img3 = document.getElementById('image3');


    // Loop through the pictures array and display them sequentially
    for (var i = 0; i < pictures.length; i++) {
        if (i === 0) {
            img1.src = pictures[i]; // Set the source of the first image
            img1.style.display = 'block'; // Show the first image
        } else if (i === 1) {
            img2.src = pictures[i]; // Set the source of the second image
            img2.style.display = 'block'; // Show the second image
        } else if (i === 2) {
            img3.src = pictures[i]; // Set the source of the third image
            img3.style.display = 'block'; // Show the third image
        }
    }
}

// script.js
const uploadImages = async () => {
    const { value: file } = await Swal.fire({
        title: 'Upload Images',
        input: 'file',
        inputAttributes: {
            multiple: 'multiple',
            accept: 'image/*',
        },
        showCancelButton: true,
        confirmButtonText: 'Upload',
        inputValidator: (value) => {
            if (!value) {
                return 'You need to select at least one image to upload';
            }
        },
    });

    if (file) {
        const images = Array.from(file);
        const imageContainer = document.querySelector('.details-left');

        // Display up to three selected images
        for (let i = 0; i < Math.min(images.length, 3); i++) {
            const img = new Image();
            img.src = URL.createObjectURL(images[i]);
            img.onload = function () {
                const existingImage = imageContainer.querySelector(`#image${i + 1}`);
                if (existingImage) {
                    existingImage.src = this.src;
                }
            };
        }

        // You can handle the uploaded images as needed here.
    }
};

// Function to check the image type
function getImageType(images) {
    for (const image of images) {
        const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!acceptedTypes.includes(image.type)) {
            return 'Unknown';
        }
    }
    return 'Valid';
}


function imageToUint8Array(imageFile, callback) {
    const reader = new FileReader();

    reader.onload = function () {
        const arrayBuffer = new Uint8Array(reader.result);
        callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(imageFile);
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

            // Function to convert Uint8Array to Array
            function uint8ArrayToArray(uint8Array) {
                return Array.from(uint8Array);
            }

            // Create a function that returns a Promise for Uint8Array conversion
            function convertToUint8Array(imageFile) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = function () {
                        const arrayBuffer = new Uint8Array(reader.result);
                        resolve(arrayBuffer);
                    };
                    reader.onerror = function (error) {
                        reject(error);
                    };
                    reader.readAsArrayBuffer(imageFile);
                });
            }

            // Use Promise.all to convert all selected images to Uint8Array
            return Promise.all([
                convertToUint8Array(selectedImages1[0]),
                convertToUint8Array(selectedImages2[0]),
                convertToUint8Array(selectedImages3[0]),
            ])
            .then((result) => {
                const [uint8Array1, uint8Array2, uint8Array3] = result;

                console.log("uint8Array1", uint8Array1);
                console.log("uint8Array2",uint8Array2);
                console.log("uint8Array3",uint8Array3);

                // Create a JSON object containing your data
                const jsonData = {
                    pictureID: null,
                    picture1: uint8Array1,
                    picture2: uint8Array2,
                    picture3: uint8Array3,
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



function displayAddFacilityBuilding() {
    Swal.fire({
     
        html:
            `
            <form id="facility-building-form"  enctype="multipart/form-data">
                <label for="facility-name-building">Name:</label>
                <input type="text" id="facility-name-building" name="facility-name-building" required>
                <br>
                <label for="facility-amount-building">Amount:</label>
                <input type="number" id="facility-amount-building" name="facility-amount-building" required>
                <br>
                <button type="submit">add</button>
            </form>
            `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton:true
     
     
    })
}

function displayAddPlan(){

    Swal.fire({
     
        html:
            `
            <form id="plan-building-form" enctype="multipart/form-data">
                <label for="plan-name-building">Plan:</label>
                <input type="text" id="plan-name-building" name="plan-name-building" required>
                <br>
                <label for="loc-plan">Location:</label>
                <input type="text" id="loc-plan" name="loc-plan" required>
                <br>
                <button type="submit">add</button>
            </form>
            `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton:true
     
     
    })
}


document.getElementById('addPlan').addEventListener('click', displayAddPlan)

document.getElementById('add-facilities-building').addEventListener('click', displayAddFacilityBuilding)

// document.getElementById('addPplan').addEventListener('click', displayAddPlan)


