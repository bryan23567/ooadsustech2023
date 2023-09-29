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
const request = new Request(apiUrl, {
    method: 'GET',
    headers: headers,
});

// Make the API request using the Fetch API
fetch(request)
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

function editPic() {
    console.log('gffdfdfdpop')
    Swal.fire({
        title: '<strong>Upload Picture</strong>',
     
        html:
            `
            <form id="imageUploadForm" enctype="multipart/form-data">
            <label for="imageInput">Select up to 3 images:</label>
            <input type="file" id="imageInput" name="image" accept="image/*" multiple>
            <button type="submit">Upload</button>
        </form>
            `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton:true
     
     
    })
}

// function displayAddFacilityBuilding() {
//     var showButton = document.getElementById("add-facilities-building");
//     var addFacilityBuildingForm = document.getElementById("facility-building-form");

//     if (addFacilityBuildingForm.style.display === "none" || addFacilityBuildingForm.style.display === "") {
//         addFacilityBuildingForm.style.display = "block";
//     } else {
//         addFacilityBuildingForm.style.display = "none";
//     }
// }

// function displayAddPlan(){
//     var showButton = document.getElementById("add-plan");
//     var addPlanForm = document.getElementById("plan-building-form");

//     if(addPlanForm.style.display == "none" || addPlanForm.style.display == ""){
//         addPlanForm.style.display = "block";
//     }
//     else{
//         addPlanForm.style.display = "none";
//     }

// }

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


document.getElementById('editPicBtn').addEventListener('click', editPic);


document.getElementById('addPlan').addEventListener('click', displayAddPlan)

document.getElementById('add-facilities-building').addEventListener('click', displayAddFacilityBuilding)

// document.getElementById('addPplan').addEventListener('click', displayAddPlan)


