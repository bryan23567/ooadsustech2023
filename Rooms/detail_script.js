// Link to the Backend API
// ------------------------------------------------------------------------------------------------------

const apiUrl = 'http://10.27.175.123:2334/api/building/6cf4a19e-d547-4e00-b2b2-cb44e1cd3123';

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
    // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
    });


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

    plans.forEach(function(plan) {
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
