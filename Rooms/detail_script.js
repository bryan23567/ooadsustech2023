// Link to the Backend API
// ------------------------------------------------------------------------------------------------------
import { uri_api } from "../global.js";

console.log('hellos')
const apiUrl = uri_api + '/api/building/6cf4a19e-d547-4e00-b2b2-cb44e1cd3123';

showLoadingScreen();
var buildingId;
var pictureId;

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
        buildingId = data.buildingId;
        pictureId = data.pictureId;
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
// var img_upload;
// function displayBuildingPicture(pictures) {
//     // const encoder = new TextEncoder();
//     // Your byte array (Uint8Array)
//     const byteArray = new Uint8Array(pictures.picture2.data);

//     // Convert the byte array to a binary string
//     let binaryString = '';
//     byteArray.forEach(byte => {
//         binaryString += String.fromCharCode(byte);
//     });

//     // Use btoa() to convert the binary string to Base64

//     function base64ToFile(base64Data, fileName) {
//         // Decode the base64 string into binary data
//         const binaryData = atob(base64Data);
//         const arrayBuffer = new ArrayBuffer(binaryData.length);
//         const uint8Array = new Uint8Array(arrayBuffer);
//         for (let i = 0; i < binaryData.length; i++) {
//             uint8Array[i] = binaryData.charCodeAt(i);
//         }

//         // Create a Blob from the binary data
//         const blob = new Blob([uint8Array]);

//         // Create a URL for the Blob
//         const blobUrl = URL.createObjectURL(blob);
//         console.log(blobUrl);
//         // Create an <a> element with the URL and file name
//         const link = document.createElement("a");
//         link.href = blobUrl;
//         link.download = fileName;

//         // // Trigger a click event on the <a> element to download the file
//         link.click();

//         // Clean up: Revoke the Blob URL
//         URL.revokeObjectURL(blobUrl);
//     }

//     // Example usage:
//     const base64Data = btoa(binaryString);
//     const fileName = "example.txt";
//     base64ToFile(base64Data, fileName);
    // document.getElementById('image1').src = "data:image/jpg;base64," + base64String;


    // // Convert the object properties into an array of Uint8Arrays
    // console.log(pictures.picture1.data);
    // const pictureArray = [pictures.picture1];
    // const imgElements = [document.getElementById('image1')]; // Replace with your <img> element IDs

    // // Function to display an image in the specified <img> element
    // function displayImageInElement(imageData, imgElement) {
    //     const reader = new FileReader();

    //     reader.onload = function () {
    //         // reader.result contains the Base64 data URL
    //         const base64Data = reader.result;
    //         console.log(base64Data);
    //         // Set the Base64 data URL as the src of the <img> element
    //         imgElement.src = base64Data;
    //         imgElement.style.display = 'block'; // Show the image

    //         // Optionally, you can also save the Base64 data for later use
    //         img_upload = base64Data;
    //         // toggle_upload.value = true; // If needed

    //         // The image is now displayed in the <img> element
    //     };

    //     // Assuming imageData is the Buffer (bytea) data from PostgreSQL
    //     const bufferData = imageData.data;

    //     // Convert the Buffer data to a Uint8Array
    //     const uint8Array = new Uint8Array(bufferData);
    //     console.log(uint8Array);
    //     // Convert the Uint8Array to a Blob
    //     const blob = new Blob([uint8Array], { type: 'image/jpg' }); // Adjust the type as needed

    //     // Read the Blob as a data URL
    //     reader.readAsDataURL(blob);
    // }

    // // Loop through the pictureArray and display them sequentially
    // pictureArray.forEach((imageData, index) => {
    //     const imgElement = imgElements[index];

    //     if (imgElement && imageData) {
    //         displayImageInElement(imageData, imgElement);
    //     }
    // });
// }

// function displayBuildingPicture(pictures) {
//     // Get references to the img elements by their IDs
//     var img1 = document.getElementById('image1');
//     // var img2 = document.getElementById('image2');
//     // var img3 = document.getElementById('image3');

//     // Create a function to convert Uint8Array to data URL
//     function onFileSelect(event) {
//         const reader = new FileReader();
//         const imgElement = document.getElementById('imgElement'); // Replace with your <img> element ID

//         reader.onload = function () {
//             // reader.result contains the Base64 data URL
//             const base64Data = reader.result;

//             // Set the Base64 data URL as the src of the <img> element
//             imgElement.src = base64Data;

//             // Optionally, you can also save the Base64 data for later use
//             img_upload = base64Data;
//             toggle_upload.value = true; // If needed

//             // The image is now displayed in the <img> element
//         };

//         // Assuming event.target.files[0] is the Buffer (bytea) data from PostgreSQL
//         const bufferData = event.target.files[0].data;

//         // Convert the Buffer data to a Uint8Array
//         const uint8Array = new Uint8Array(bufferData);

//         // Convert the Uint8Array to a Blob
//         const blob = new Blob([uint8Array], { type: 'image/jpeg' }); // Adjust the type as needed

//         // Read the Blob as a data URL
//         reader.readAsDataURL(blob);
//     }

//     // Convert the object properties into an array of Uint8Arrays
//     // const pictureArray = [pictures.picture1, pictures.picture2, pictures.picture3];
//     // Convert Uint8Array to Blob
//     const imageData = pictures.picture1; // Replace with your actual data

//     // Create a Blob from the Uint8Array data
//     const blob = new Blob([imageData], { type: 'image/jpeg' }); // Adjust the type as needed

//     // Create a File object from the Blob
//     const file = new File([blob], 'image.jpg', { type: 'image/jpeg' }); // Adjust the filename and type

//     // Create an event object with the File as the target
//     const event = { target: { files: [file] } };

//     // Call the onFileSelect function with the event
//     onFileSelect(event);
//     // Loop through the picture array and display them sequentially
//     // Promise.all(pictureArray.map(uint8ArrayToDataURL)).then((dataURLs) => {
//     //     console.log(dataURLs);
//     //     if (dataURLs[0]) {
//     //         img1.src = dataURLs[0]; // Set the source of the first image
//     //         img1.style.display = 'block'; // Show the first image
//     //     }

//     //     if (dataURLs[1]) {
//     //         img2.src = dataURLs[1]; // Set the source of the second image
//     //         img2.style.display = 'block'; // Show the second image
//     //     }

//     //     if (dataURLs[2]) {
//     //         img3.src = dataURLs[2]; // Set the source of the third image
//     //         img3.style.display = 'block'; // Show the third image
//     //     }
//     // });
// }


function displayBuildingPicture(pictures) {
    const imageIds = ['image1', 'image2', 'image3']; // IDs of the <img> elements
    const imageContainer = document.querySelector('.details-left');

    imageIds.forEach((imageId, index) => {
        if (pictures[`picture${index + 1}`]) {
            console.log(`picture${index + 1}`);
            console.log(pictures[`picture${index + 1}`]);
            const imgElement = document.getElementById(imageId);

            // Assuming imageData is the Buffer (bytea) data from PostgreSQL
            const bufferData = new Uint8Array(pictures[`picture${index + 1}`].data);

            // Convert the Uint8Array to a Blob
            const blob = new Blob([bufferData], { type: 'image/jpg' }); // Adjust the type as needed

            // Read the Blob as a data URL and set it as the src of the <img> element
            const reader = new FileReader();
            reader.onload = function () {
                imgElement.src = reader.result;
            };
            reader.readAsDataURL(blob);
        }
    });
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
        showConfirmButton: true


    })
}

function displayAddPlan() {

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
        showConfirmButton: true


    })
}


document.getElementById('addPlan').addEventListener('click', displayAddPlan)

document.getElementById('add-facilities-building').addEventListener('click', displayAddFacilityBuilding)

// document.getElementById('addPplan').addEventListener('click', displayAddPlan)


