

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
            <label for="group-name">Group name:</label>
            <input type="text" id="group-name" name="group-name" required
            </form>`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Create a Group',
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
        var groupName = group.groupName;
        var occ = group.occupants ;
        var available = 4 - occ.length

        var occupants = "";
        for (var i = 0; i < group.occupants.length; i++) {
            if (i > 0) {
                occupants += ", ";
            }
            occupants += group.occupants[i];
        }

        //var location = "Building: " + building + ", Floor: " + floor + ", Room: " + room ; 

        newRow.innerHTML = `
            <td>${gender}</td>
            <td>${groupName}</td>
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