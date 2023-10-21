

// fetch(getRequest)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json(); // Parse the response JSON
//     })
//     .then(data => {
//         // Print the response body
//         hideLoadingScreen();

//         console.log('Response Body For Map:', data);

//         displayGroupInfo(data.groups);


//         // Print the status code
//         console.log('Status Code:', data.status);
//     })
//     .catch(error => {

//         hideLoadingScreen();
//         // Handle errors here

//         alert("Please Contact Anthony Bryan for further support!");
//         console.error('There was a problem with the fetch operation:', error);
//     });


    //loading screen

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'block';
}
    
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'none';
}


function createGroupRoomForm() {
    Swal.fire({
        title: 'Add Group',
        html: `
            <form id="add-mygroup">
            <label for="add-name-building">Building:</label>
            <select id="add-name-building" name="add-name-building" required>
                <option value="1">Building 1</option>
                <option value="2">Building 2</option>
                <option value="3">Building 3</option>
                <option value="4">Building 4</option>
                <option value="5">Building 5</option>
                <option value="6">Building 6</option>
                <option value="7">Building 7</option>
                <option value="8">Building 8</option>
                <option value="9">Building 9</option>
                <option value="10">Building 10</option>
                <option value="11">Building 11</option>
                <option value="12">Building 12</option>
                <option value="13">Building 13</option>
                <option value="14">Building 14</option>
                <option value="15">Building 15</option>
                <option value="16">Building 16</option>
            </select>
            <br><br>
        
            <label>Floor:</label><br>
            <input type="radio" id="floor2" name="choose-floor" value="2" required>
            <label for="floor2">2</label><br>
            <input type="radio" id="floor3" name="choose-floor" value="3" required>
            <label for="floor3">3</label><br>
            <input type="radio" id="floor4" name="choose-floor" value="4" required>
            <label for="floor4">4</label><br>
            <input type="radio" id="floor5" name="choose-floor" value="5" required>
            <label for="floor5">5</label><br>
            <input type="radio" id="floor6" name="choose-floor" value="6" required>
            <label for="floor6">6</label><br>
            <br>
        
            <label for="choose-room-num">Room:</label>
            <input type="text" id="choose-room-num" name="choose-room-num" required
            </form>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Succefully added!',
            );
        }
    });
}

document.getElementById('create-group').addEventListener('click', createGroupRoomForm);

function displayGroupInfo(groups) {
    var tableBody = document.querySelector('.group-table tbody');

    groups.forEach(function (group) {
        var newRow = document.createElement('tr');

        var gender = group.gender;
        var building = group.building;
        var floor = group.floor;
        var room = group.room;
        var roomType = group.roomType;

        var occupants = "";
        for (var i = 0; i < group.occupants.length; i++) {
            if (i > 0) {
                occupants += ", ";
            }
            occupants += group.occupants[i];
        }

        var available = group.available;
        var location = "Building: " + building + ", Floor: " + floor + ", Room: " + room ; 

        newRow.innerHTML = `
            <td>${gender}</td>
            <td>${location}</td>
            <td>${roomType}</td>
            <td>${occupants}</td>
            <td>${available}</td>
            <td>
                <button class="join-group-btn">join</button><br>
            </td>
        `;

        tableBody.appendChild(newRow);
    });
}

function joinGroupConfirmation(){
    Swal.fire(
        'Are you sure want to join?',
        'NOTE: You cannot join if you have group already!'
    )
}

//document.getElementById('join-group-btn').addEventListener('click', joinGroupConfirmation);
var joinButtons = document.querySelectorAll('.join-group-btn');
joinButtons.forEach(function(button) {
    button.addEventListener('click', joinGroupConfirmation);
});

function inviteStudent(){
    Swal.fire({
        title: 'Invite student',
        html: `
            <form id="invite-student-tothe-group">
                <label for="invite-sid">SID:</label>
                <input type="text" id="invite-sid" name="invite-sid" required
            </form>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Invitation sent!',
            );
        }
    });
}

//document.getElementById('invite-button').addEventListener('click', inviteStudent);
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('invite-button').addEventListener('click', inviteStudent);
});