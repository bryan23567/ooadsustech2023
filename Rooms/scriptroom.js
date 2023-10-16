// API codes

import { uri_api } from "../global.js";
const queryParams = new URLSearchParams(window.location.search);
const buildingID = queryParams.get("buildingId");
console.log('Scriptroom!')
const apiUrl = uri_api + '/api/mapBuilding/' + buildingID;

showLoadingScreen();

var floorFacilitiesId;

var floorNumber;
var floorId;
var floorLink;
var floorAnchor;

var room;
var roomName;
var roomId;
var roomType;

var student;
var studentName;
var studentSID;

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

        console.log('Response Body For Map:', data);

        displayBuildingName(data.name);
        displayFloorNumbers(data.floors);

        
        // displayFloorFacilities(data.floors[0].floorFacilities);

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

function reloadContent(apiEndpoint, targetElementId, reloadPage = false, requestData = {}) {
    // Define the request headers for a POST request
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    // Create the request object for a POST request
    const postRequest = new Request(uri_api + apiEndpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData), // Pass request data as JSON
    });

    fetch(postRequest)
        .then(response => response.json())
        .then(data => {
            // Update the HTML of the target element with the new data
            document.getElementById(targetElementId).innerHTML = data.content;

            // Optionally, reload the page
            if (reloadPage) {
                location.reload();
            }
        })
        .catch(error => {
            console.error(`Error reloading ${apiEndpoint}:`, error);
        });
}


// reloadContent('/api/addFloorFacilities', 'add-facilities-floor');
// reloadContent('/api/addOccupiying', 'occupying-info');
// reloadContent('/api/deletefloorFacilities', 'add-facilities-floor');
// reloadContent('/api/deleteOccupiying', 'occupying-info');

// FUNCTION DISPLAYING THE DATA FROM BACKEND

function displayBuildingName(name) {
    var building_name = document.getElementById("building-name");
    building_name.innerHTML = name;
}

function displayFloorNumbers(arrayFloors) {
    var aside = document.querySelector('.left');

    for (var i = 0; i < arrayFloors.length; i++) {
        floorNumber = arrayFloors[i].name;
        floorId = arrayFloors[i].floorId;
        floorLink = document.createElement('div');
        floorAnchor = document.createElement('a');

        // console.log("Floor Number", floorNumber);
        // console.log("Floor Id", floorId);
        // console.log("Floor Link", floorLink);
        // console.log("Floor Anchor", floorAnchor);

        floorAnchor.textContent = floorNumber;
        floorAnchor.dataset.floorId = floorId; // Store the floorId as a data attribute

        // Add a click event listener to each floor anchor
        floorAnchor.addEventListener('click', function(event) {
            var clickedFloorId = event.target.dataset.floorId;
            fetchFloorData(clickedFloorId); // Call a function to fetch and display data for the clicked floor
        });

        floorLink.appendChild(floorAnchor);
        aside.appendChild(floorLink);
    }
}

// Function to fetch and display data for a specific floor
function fetchFloorData(floorId) {
    console.log("Floor ID:", floorId);
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch floor data
    fetch(uri_api + `/api/floorRooms/${floorId}`)
        .then(response => response.json())
        .then(data => {
            // Call a function to display the data for the selected floor
            console.log(data);
            displayRoomBlocks(data.rooms); // Use the previously provided function to display data
            displayFloorFacilities(data.floorFacilities);
        })
        .catch(error => {
            console.error('Error fetching floor data:', error);
            // Handle errors if needed
        });
}


var len;
var available;
function displayRoomBlocks(arrayRoomPerFloor) {
    console.log(arrayRoomPerFloor);
    var leftEven = document.querySelector('.left-even');
    var rightOdd = document.querySelector('.right-odd');

    // Clear the previous room data in left-even and right-odd containers
    clearRoomData(leftEven);
    clearRoomData(rightOdd);

    function clearRoomData(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    for (var i = 0; i < arrayRoomPerFloor.length; i++) {
        room = arrayRoomPerFloor[i];
        roomName = parseInt(room.name, 10);
        roomId = room.roomId;
        roomType = room.type;

        // Get availability from your data
        if (roomType == 'single') {
            len = 1;
        } else if (roomType == 'double') {
            len = 2;
        } else if (roomType == 'triple') {
            len = 3;
        } else {
            len = 4;
        }

    
        console.log(room);
        console.log(roomName);
        console.log(roomId);
        console.log(roomType);
        
        var isEven = roomName % 2 == 0; // Check if roomId is even

        // Create the room div element
        var roomDiv = document.createElement('div');
        roomDiv.className = 'room-id'; // Use className instead of name
        roomDiv.innerHTML = `<b>${roomName}</b><br>${roomType}<br>available: ${available}`;

        // Create a function to handle the click event with the correct roomId
        function handleRoomClick(roomId, roomName) {
            return function() {
                fetchRoomOccupiedData(roomId, roomName); // Fetch and display room occupied data
            };
        }

        if (isEven) {
            roomDiv.onclick = handleRoomClick(roomId, roomName);
            leftEven.appendChild(roomDiv); // Append to left-even container
        } else {
            roomDiv.onclick = handleRoomClick(roomId, roomName);
            rightOdd.appendChild(roomDiv); // Append to right-odd container
        }
    }
}


function fetchRoomOccupiedData(roomId, roomName) {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch room occupied data
    fetch(uri_api + `/api/roomOccupied/${roomId}`)
        .then(response => response.json())
        .then(data => {
            // Call the displayOccupyingRoom function to display the data for the selected room
            console.log(data);
            displayOccupyingRoom(roomName, data.occupied);
        })
        .catch(error => {
            console.error('Error fetching room occupied data:', error);
            // Handle errors if needed
        });
}



function displayOccupyingRoom(roomName, arrayStudentOccupying) {
    console.log(roomName);

    var room_num = document.getElementById("room-number-occupying");
    var tableBody = document.querySelector('.occupying-table');

    // Clear the previous data rows, keeping the first row (category row)
    while (tableBody.children.length > 1) {
        tableBody.removeChild(tableBody.lastChild);
    }

    room_num.innerHTML = 'Room ' + roomName;

    for (var i = 0; i < arrayStudentOccupying.length; i++) {
        student = arrayStudentOccupying[i];
        studentName = student.user.name; // Get student name from your data
        studentSID = student.user.sid;

        // Create a new table row
        var newRow = document.createElement('tr');

        // Create table data cells for student name and operation
        var nameCell = document.createElement('td');
        var operationCell = document.createElement('td');

        // Create a button for deleting the student
        var deleteButton = document.createElement('button');
        deleteButton.className = 'delete-occupying';
        deleteButton.textContent = 'delete';

        // Attach a click event handler to the delete button
        deleteButton.onclick = function () {
            deleteRow(this);
        };

        // Set the student name in the name cell
        nameCell.textContent = studentName;

        // Append the delete button to the operation cell
        operationCell.appendChild(deleteButton);

        // Append the cells to the table row
        newRow.appendChild(nameCell);
        newRow.appendChild(operationCell);

        // Append the row to the table body
        tableBody.appendChild(newRow);
    }

    var deleteButtons = document.querySelectorAll('.delete-occupying');
    deleteButtons.forEach(function(button){
        button.addEventListener('click', deleteMapStudent);
    });
}

function displayFloor(floors){ 
    for(var i = 0; i < floors.length; i++){
        console.log(floors[i]);
        displayFloorFacilities(floors[i]);
    }
}


function displayFloorFacilities(arrayFacilitiesFloor) {
    console.log("Displaying Floor Facility!");
    console.log(arrayFacilitiesFloor);
    var tableBody = document.querySelector('.table-floor');

    // Clear the previous data rows, keeping the first row (category row)
    while (tableBody.children.length > 1) {
        tableBody.removeChild(tableBody.lastChild);
    }

    arrayFacilitiesFloor.forEach(function (facility, index) {
        // console.log("Facility", facility);
        var newRow = document.createElement("tr");

        var facilityName = facility.name;
        var facilityAmount = facility.Amount;
        
        floorFacilitiesId = facility.floorFacilitiesId;
        //var facilityLoc = facility.location;

        newRow.innerHTML = `
            <td>${facilityName}</td>
            <td>${facilityAmount}</td>
            <td>
            <button class="delete-floor-facility" facility-id="${index}">Delete</button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });

    // Add click event listeners to the "Delete" buttons;
    var deleteButtons = document.querySelectorAll('.delete-floor-facility');
    deleteButtons.forEach(function (button) {
        button.addEventListener('click', deleteMapFacility); 
    });
}


// FUNCTION ------------------------------------------------------------------------------------------------------------------



function showOccupying(roomId) {
    // Remove 'active' class from all room elements
    var roomElements = document.querySelectorAll('.room');
    roomElements.forEach(function (element) {
        element.classList.remove('active');
    });

    // Add 'active' class to the selected room
    var room = document.querySelector('.room[data-room="' + roomId + '"]');
    if (room) {
        room.classList.add('active');
    }

    // Fetch the roomInfo based on roomId
    // You should add the logic here to get the room information
    // For now, let's assume roomInfo is a string
    var roomInfo = getRoomInfo(roomId);

    // Display the room info in the occupying-info div
    var occupyingInfoDiv = document.getElementById('occupying-info');
    occupyingInfoDiv.innerHTML = `
        <h3>Occupying:</h3>
        <h4>Room ${roomId}</h4>
        <table class="occupying-table">
            <tr>
                <th>Name</th>
                <th>operation</th>
            </tr>
            ${roomInfo}
        </table>
        <button id="add-occupying" onclick="displayAddStudent()">
            add student
        </button>
        <form id="add-occupying-form" style="display: none;">
            <label for="add-stu-id-occupying-room">SID:</label>
            <input type="text" id="add-stu-id-occupying-room" name="sid-occupying" required pattern="[0-9]{8}">
            <br>
            <button type="submit">submit</button>
        </form>
    `;
}

// Define a function to get room information based on roomId
function getRoomInfo(roomId) {
    // Example data for room information (you should replace this with your actual data)
    var roomData;
    // Check if roomData for the specified roomId exists
    if (roomData.hasOwnProperty(roomId)) {
        var roomInfo = roomData[roomId];
        var occupantsHtml = roomInfo.occupants.map(function (occupant) {
            return `
                <tr>
                    <td>${occupant.name}</td>
                    <td>
                        <button class="delete-occupying">delete</button>
                    </td>
                </tr>
            `;
        }).join('');

        return `
            <tr></tr>
            ${occupantsHtml}
        `;
    } else {
        return `<tr><td colspan="2">No information available for Room ${roomId}</td></tr>`;
    }
}


function displayAddFloorFacility(){

    Swal.fire({
        title: 'Add Floor Facility',
     
        html:
            `
            <form id="plan-building-form" enctype="multipart/form-data">
                <label for="floor-facility-name">Facility:</label>
                <input type="text" id="floor-facility-name" name="floor-facility-name" required>
                <br>
                <label for="floor-amount">Amount:</label>
                <input type="text" id="floor-amount" name="floor-amount" required>
                <br>
            </form>
            `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton:true,
        preConfirm: () => {
            const planNameInput = document.getElementById('floor-facility-name').value;
            const amountInput = document.getElementById('floor-amount').value;

            // You can perform input validation here if needed

            // Create an object with the form data
            const formData = {
                name: planNameInput,
                Amount: amountInput,
                floorId: floorId,
            };

            // Make a POST request to your server
            return fetch(uri_api + '/api/addFloorFacilities', {
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
            // reloadContent('/api/addFloorFacilities', 'add-facilities-floor');
        }
    });
}

function displayAddStudentOccupying(){

    Swal.fire({
     
        html:
            `
            <form id="plan-building-form" enctype="multipart/form-data">
                <label for="stu-occ-id">SID:</label>
                <input type="text" id="stu-occ-id" name="stu-occ-id" required>
            </form>
            `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton:true,
        preConfirm: () => {
            const studentIdInput = document.getElementById('stu-occ-id').value;
            
            // You can perform input validation here if needed

            // Create an object with the form data
            const formData = {
                roomId: roomId,
                userId: studentIdInput,
            };

            // Make a POST request to your server
            return fetch(uri_api + '/api/addOccupiying', {
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
            Swal.fire('Success!', 'Student added successfully.', 'success');
            // reloadContent('/api/addOccupiying', 'occupying-info');
        }
    });
}

document.getElementById('add-facilities-floor').addEventListener('click', displayAddFloorFacility);

document.getElementById('add-occupying').addEventListener('click', displayAddStudentOccupying);

function deleteRow(button){
    if(confirm("Are you sure you want to delete?")){
        var row = button.parentNode.parentNode;
        row.remove();
    }
}



function deleteMapStudent(event){
    const studentId = event.target.getAttribute('stu-occ-id');
    console.log(studentId);

    Swal.fire({
        title: 'Delete Student',
        text: 'Are you sure you want to delete this student?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
    }).then((result) => {
        if (result.isConfirmed) {
            // Make a DELETE request to your server to delete the student by facilityId
            fetch(uri_api + `/api/deleteOccupiying`, {
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
                console.log('Student deleted:', data);
                Swal.fire('Deleted!', 'The student has been deleted.', 'success');
                // reloadContent('/api/deleteOccupiying', 'occupying-info');
            })
            .catch(function(error) {
                // Handle errors here
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire('Error', 'An error occurred while deleting the facility.', 'error');
            });
        }
    });
}


function deleteMapFacility(event){
    const facilityId = event.target.getAttribute('floor-facility-name');
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
            fetch(uri_api + `/api/deletefloorFacilities`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    floorId: floorId,
                    floorFacilitiesId: floorFacilitiesId,
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
                // reloadContent('/api/deletefloorFacilities', 'add-facilities-floor');
            })
            .catch(function(error) {
                // Handle errors here
                console.error('There was a problem with the fetch operation:', error);
                Swal.fire('Error', 'An error occurred while deleting the facility.', 'error');
            });
        }
    });
}


  
