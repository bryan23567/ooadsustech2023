
import { uri_api } from "../global.js";
// import { setUserInfo, getUserInfo } from "../global.js";

console.log('Coordinates!')
const apiUrl = uri_api + '/api/getAllBuilding';
// const userInfo = getUserInfo();
// console.log(userInfo);

const backgroundImage = document.getElementById('campus-map');
// Create an image map for clickable areas
const campusMap = document.getElementById('campus-map');
campusMap.useMap = '#housemap';
// Define the map
const map = document.createElement('map');
map.name = 'housemap';

const markedPointsContainer = document.getElementById('marked-points-container');
const popup = document.getElementById('popup');
const pointForm = document.getElementById('point-form');
const coordinates = document.getElementById('coordinates');
let zoomLevel, rect,mouseX, mouseY, x,y,imageX, imageY; // Declare x and y variables
const markedPointsInfo = [];

showLoadingScreen();

let buildings;

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

        console.log('Response Body For Coordinates:', data);

        buildings = data.buildings;

        displayBuilding(buildings);

        /* 
        buildingCoordinateX: 427
        buildingCoordinateY: 942
        buildingId: "6cf4a19e-d547-4e00-b2b2-cb44e1cd3123"
        collageId: "af8c6f5f-216a-4d23-bc7f-f1a47de6a017"
        createdAt: "2023-09-23T09:45:52.389Z"
        location: "Hanoi City"
        name: "Building 1"
        pictureId: "edd2a302-6182-4bdd-819e-6d495c924a46" 
        */

        console.log(buildings);

        // Print the status code
        console.log('Status Code:', data.status);
    })
    .catch(error => {

        hideLoadingScreen();
        // Handle errors here

        alert("Please Contact Anthony Bryan for further support!");
        console.error('There was a problem with the fetch operation:', error);
    });


// 


// Function to show the loading screen
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'block';
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
}



function getPageZoomLevel() {
    // Create a reference element with a known size (e.g., 1358x1921 pixels)
    const referenceElement = document.createElement('div');
    referenceElement.style.width = '100px';
    referenceElement.style.height = '100px';
    referenceElement.style.position = 'fixed';
    referenceElement.style.top = '-1000px'; // Move the element out of the viewport
    document.body.appendChild(referenceElement);
    
    // Measure the size of the reference element
    const actualWidth = referenceElement.offsetWidth;
    
    // Calculate the zoom level
    const zoomLevel = actualWidth / 100; // Assuming the expected size is 100px
    
    // Remove the reference element
    referenceElement.remove();
    
    return zoomLevel;
}
// Add an event listener for mousemove to display coordinates
backgroundImage.addEventListener('mousemove', (m) => {
    rect = backgroundImage.getBoundingClientRect()
    mouseX = m.clientX - rect.left;
    mouseY = m.clientY - rect.top;
    
    if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        
    // Cursor is inside the image
        coordinates.innerText = `X: ${mouseX.toFixed(2)}, Y: ${mouseY.toFixed(2)}`;
    } else {
        // Cursor is outside the image
        coordinates.innerText = '';
    }
});

// Add an event listener for click to show the form
backgroundImage.addEventListener('click', (c) => {
    console.log('Clicked on background image'); // Debugging line
    zoomLevel = getPageZoomLevel();
    x=mouseX.toFixed(2);
    y=mouseY.toFixed(2);
    imageX=x/zoomLevel;
    imageY=y/zoomLevel;
    // // Show the form at the clicked coordinates
    // popup.style.display = 'block';

    // // Pre-fill the coordinates in the form
    // document.getElementById('point-name').value = `X: ${x}, Y: ${y}`;

    Swal.fire({
        title: 'Add New Building',
        html: `
        <form id="point-form">
            <h2>Enter Point Information</h2>
            <label for="point-name">Point Name: X = ${x}, Y = ${y}</label>
            <id="point-name" required>
            <br>
            <label for="building-name">Building Name:</label>
            <input type="text" id="building-name" required>
            <br>
            <!--<label for="building-number">Building Number:</label>
            <input type="text" id="building-number" required>
            <label for="total-floor">Total Floor:</label>
            <input type="text" id="total-floor" required>-->
            <br>
            <label for="college-name">College Name:</label>
            <select id="collegeSelect" name="college" required>
                <option value=1>Zhiren</option>
                <option value=2>Zhicheng</option>
                <option value=3>Shuren</option>
                <option value=4>Shude</option>
                <option value=5>Zhixin</option>
                <option value=6>Shuli</option>
            <!-- Add more options as needed -->
            </select>
            <br>
            <label for="building-description">Building Description:</label>
            <textarea id="building-description" rows="4" required></textarea>
        </form>
        `,

        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton: true,
        preConfirm: () => {
            
            const buildingName = document.getElementById('building-name').value;
            const buildingDescription = document.getElementById('building-description').value;
            const collegename = document.getElementById('collegeSelect').value;

            // You can perform input validation here if needed

            // Create an object with the form data
            const formData = {
                name: buildingName,
                collageId: collegename,
                buildingCoordinateX: x,
                buildingCoordinateY: y,
                buildingDescription: buildingDescription,
            };

            // Make a POST request to your server
            return fetch(uri_api + '/api/addNewBuilding', {
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
            Swal.fire('Success!', 'Building added successfully.', 'success');
            reloadWebsite();
        }
    });


});

// Add an event listener for form submission
pointForm.addEventListener('submit', (s) => {
    rect = backgroundImage.getBoundingClientRect()
    s.preventDefault();
    
    // Get user input from the form
    const pointname = document.getElementById('point-name').value;
    const buildingname = document.getElementById('building-name').value;
    const buildingnumber = document.getElementById('building-number').value;
    const collegename = document.getElementById('college-name').value;
    const totalfloor = document.getElementById('total-floor').value;
    const description = document.getElementById('building-description').value;

    // Store the information for the marked point
    const markedPointInfo = {
        x,
        y,
        pointname,
        buildingname,
        buildingnumber,
        collegename,
        totalfloor,
        description,
    };
    // Add the marked point information to the array
    markedPointsInfo.push(markedPointInfo);
    //xWeb =
    // Create a clickable marked point on the image
    const markedPoint = document.createElement('area');
    markedPoint.className = 'marked-point';
    markedPoint.style.left = `${imageX}px`;//x + 'px';
    markedPoint.style.top = `${imageY}px`;//y + 'px';
    markedPoint.shape='rect';
    markedPoint.coords = `${imageX},${imageY}`; // x, y, width, height
    markedPoint.alt = buildingnumber;
    
    markedPoint.href = `../Rooms/details.html?buildingId=` + building.buildingId; // Set the href to the desired page
    // Attach additional data to the marked point (e.g., name, description)
    markedPoint.dataset.buildingNumber = buildingnumber;
    markedPoint.dataset.pointname = pointname;
    markedPoint.dataset.buildingname = buildingname;
    markedPoint.dataset.collegename = collegename;
    markedPoint.dataset.totalfloor = totalfloor;
    markedPoint.dataset.description = description;
    
    // Create a span element for the building number text
    const buildingNumberSpan = document.createElement('span');
    buildingNumberSpan.className = 'building-number';
    buildingNumberSpan.innerText = buildingnumber;

    // Append the marked point to the container
    markedPointsContainer.appendChild(markedPoint);
    // Hide the form
    popup.style.display = 'none';

    // Reset form inputs
    pointForm.reset();
});

const closeFormButton = document.getElementById('close-form-button');

closeFormButton.addEventListener('click', () => {
    // Hide the form
    popup.style.display = 'none';
});

function displayCoordinates(building){
    
}



function deletePoint(event){
    const building = event.target.getAttribute('marked-points-container');
    console.log(studentId);

    Swal.fire({
        title: 'Delete Building',
        text: 'Are you sure you want to delete this building?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            // Make a DELETE request to your server to delete the student by facilityId
            fetch(uri_api + `/api/deleteBuilding`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    roomId: roomId,
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
                console.log('Building deleted:', data);
                Swal.fire('Deleted!', 'The building has been deleted.', 'success');
                // reloadContent('/api/deleteOccupiying', 'occupying-info');
            })
            .catch(function(error) {
                // Handle errors here
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire('Error', 'An error occurred while deleting the building.', 'error');
            });
        }
    });
    
}

function editPoint(event){

}

function displayBuilding(buildings) {
    console.log("DIsplaying Building");
    // Get the <map> element by its name
    const mapElement = document.querySelector('map[name="housemap"]');
    zoomLevel = getPageZoomLevel();
    
    // Loop through the buildings array and create an <area> element for each building
    buildings.forEach((building, index) => {
        console.log(building);
        // Create a new <area> element
        const areaElement = document.createElement('area');
        
        // Set the shape, coordinates, and other attributes for the <area> element
        areaElement.shape = 'rect'; // You can adjust the shape as needed
        areaElement.coords = `${building.buildingCoordinateX},${building.buildingCoordinateY}`; // Use building properties for X, Y, and radius
        areaElement.href = `../Rooms/details.html?buildingId=` + building.buildingId; // Assuming the href follows the pattern
        areaElement.alt = building.name; // Use building name or other identifier
        areaElement.className = 'marked-point';
        areaElement.style.left = `${building.buildingCoordinateX/zoomLevel}px`;//x + 'px';
        areaElement.style.top = `${building.buildingCoordinateY/zoomLevel}px`;//y + 'px';
        areaElement.buildingId = building.buildingId;
        console.log(areaElement)
        // Append the <area> element to the <map>
        mapElement.appendChild(areaElement);
    });
}
