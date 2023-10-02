// API codes

import { uri_api } from "../global.js";

console.log('Scriptroom!')
const apiUrl = uri_api + '/api/mapBuilding/6cf4a19e-d547-4e00-b2b2-cb44e1cd3123';

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

        console.log('Response Body For Map:', data);

        //buildingName = data.name;
        //buildingId = data.buildingId;
        //floors = data.floors;
        //location = data.location;

        displayBuildingName(data.name);
        displayFloorNumbers(data.floors);
        displayFloorFacilities(data.floors[0].floorFacilities);


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

// FUNCTION DISPLAYING THE DATA FROM BACKEND

function displayBuildingName(name) {
    var building_name = document.getElementById("building-name");
    building_name.innerHTML = name;
}

function displayFloorNumbers(arrayFloors) {
    var aside = document.querySelector('.left');

    for (var i = 0; i < arrayFloors.length; i++) {
        var floorNumber = arrayFloors[i].name;
        var floorId = arrayFloors[i].floorId;
        var floorLink = document.createElement('div');
        var floorAnchor = document.createElement('a');

        console.log("Floor Number", floorNumber);
        console.log("Floor Id", floorId);
        console.log("Floor Link", floorLink);
        console.log("Floor Anchor", floorAnchor);

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
        var room = arrayRoomPerFloor[i];
        var roomName = parseInt(room.name, 10);
        var roomId = room.roomId;
        var roomType = room.type;
        var available;

        // Get availability from your data
        var len;
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
        var student = arrayStudentOccupying[i];
        var studentName = student.user.name; // Get student name from your data
        var studentSID = student.user.sid;

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
}


function displayFloorFacilities(arrayFacilitiesFloor) {

    console.log("Displaying Floor Facility!");
    var tableBody = document.querySelector('.table-floor');

    // Clear the previous data rows, keeping the first row (category row)
    while (tableBody.children.length > 1) {
        tableBody.removeChild(tableBody.lastChild);
    }

    arrayFacilitiesFloor.forEach(function (facility, index) {
        var newRow = document.createElement("tr");

        var facilityName = facility.name;
        var facilityAmount = facility.Amount;
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
        button.addEventListener('click', deleteMapFacility); //???
    });
    // for (var i = 0; i < arrayFacilitiesFloor.length; i++) {
    //     var facility = arrayFacilitiesFloor[i];
    //     var facilityName = facility.name; // Get facility name from your data
    //     //var facilityAmount = facility.amount; // Get facility amount from your data

    //     // Create a new table row
    //     var newRow = document.createElement('tr');

    //     // Create table data cells for facility name, amount, and operation
    //     var nameCell = document.createElement('td');
    //     var amountCell = document.createElement('td');
    //     var operationCell = document.createElement('td');

    //     // Set the facility name and amount in their respective cells
    //     nameCell.textContent = facilityName;
    //     //amountCell.textContent = facilityAmount;

    //     // Create buttons for edit and delete operations
    //     var editButton = document.createElement('button');
    //     editButton.textContent = 'edit';

    //     var deleteButton = document.createElement('button');
    //     deleteButton.className = 'delete-facility-floor';
    //     deleteButton.textContent = 'delete';
    //     deleteButton.onclick = function () {
    //         deleteRow(this);
    //     };

    //     // Append buttons to the operation cell
    //     operationCell.appendChild(editButton);
    //     operationCell.appendChild(deleteButton);
    //     // Append cells to the row
    //     newRow.appendChild(nameCell);
    //     newRow.appendChild(amountCell);
    //     newRow.appendChild(operationCell);

    //     // Append the row to the table body
    //     tableBody.appendChild(newRow);
    // }
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
                        <button class="delete-occupying" onclick="deleteRow(this)">delete</button>
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


function displayAddFloorFasility(){

    Swal.fire({
     
        html:
            `
            <form id="plan-building-form" enctype="multipart/form-data">
                <label for="floor-facility-name">Plan:</label>
                <input type="text" id="floor-facility-name" name="floor-facility-name" required>
                <br>
                <label for="floor-amount">Location:</label>
                <input type="text" id="floor-amount" name="floor-amount" required>
                <br>
            </form>
            `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        showConfirmButton:true
     
     
    })
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
        showConfirmButton:true
     
     
    })
}

document.getElementById('add-facilities-floor').addEventListener('click', displayAddFloorFasility);

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
            fetch(uri_api + `/api/deleteBuildingFacilities`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // buildingFacilitiesId: facilities[facilityId].buildingFacilitiesId,
                    // buildingId: buildingId,
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
            fetch(uri_api + `/api/deleteBuildingFacilities`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // buildingFacilitiesId: facilities[facilityId].buildingFacilitiesId,
                    // buildingId: buildingId,
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


  
