
// FUNCTION DISPLAYING THE DATA FROM BACKEND



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
    var roomData = {
        202: {
            name: "Room 202",
            occupants: [
                { name: "Lam Nguyen", id: "12345678" },
                { name: "Bryan Anthony", id: "87654321" }
            ]
        },
        204: {
            name: "Room 204",
            occupants: [
                { name: "Alice Smith", id: "11111111" },
                { name: "Bob Johnson", id: "22222222" }
            ]
        },
        // Add more room data as needed
    };

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




  
