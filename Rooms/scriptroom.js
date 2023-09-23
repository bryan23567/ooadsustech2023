function addFacilityBuilding(){
    console.log("Add Facility Floor!")
    var name = document.getElementById("facility-name-floor").value;
    var amount = document.getElementById("facility-amount-floor").value;

    const table = document.getElementById(".table-building");

    const row = table.insertRow(-1);
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = 'Floor ' + amount;
    row.insertCell(2).innerHTML = `
    <button>edit</button>
    <button class="delete-facility-building" onclick="deleteRow(this)">delete</button>
    `;
    

    return false;
}


function displayAddFacilityBuilding() {
    var showButton = document.getElementById("add-facilities-building");
    var addFacilityBuildingForm = document.getElementById("facility-building-form");

    if (addFacilityBuildingForm.style.display === "none" || addFacilityBuildingForm.style.display === "") {
        addFacilityBuildingForm.style.display = "block";
    } else {
        addFacilityBuildingForm.style.display = "none";
    }
}

function displayAddPlan(){
    var showButton = document.getElementById("add-plan");
    var addPlanForm = document.getElementById("plan-building-form");

    if(addPlanForm.style.display == "none" || addPlanForm.style.display == ""){
        addPlanForm.style.display = "block";
    }
    else{
        addPlanForm.style.display = "none";
    }

}

function displayDescription(){
    var showButton = document.getElementById("edit-desc-button");
    var addDescripttion = document.getElementById("edit-desc");

    if(addDescripttion.style.display == "none" || addDescripttion.style.display == ""){
        addDescripttion.style.display = "block";
    }
    else{
        addDescripttion.style.display = "none";
    }
}

function displayAddFacility(){
    var showButton = document.getElementById("add-facilities-floor");
    var addFacility = document.getElementById("facility-form");

    if(addFacility.style.display == "none" || addFacility.style.display == ""){
        addFacility.style.display = "block";
    } else{
        addFacility.style.display = "none";
    }
}

function displayAddStudent(){
    var showButton = document.getElementById("add-occupying");
    var addStudent = document.getElementById("add-occupying-form");

    if(addStudent.style.display == "none" || addStudent.style.display == ""){
        addStudent.style.display = "block";
    } else{
        addStudent.style.display = "none";
    }
}

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
            <tr>
                
            </tr>
            ${occupantsHtml}
        `;
    } else {
        return `<tr><td colspan="2">No information available for Room ${roomId}</td></tr>`;
    }
}






function deleteRow(button){
    if(confirm("Are you sure you want to delete?")){
        var row = button.parentNode.parentNode;
        row.remove();
    }
}


  
