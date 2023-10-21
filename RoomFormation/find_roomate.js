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

function displayStudentInfo(students) {
    var tableBody = document.querySelector('.find-roomate-table tbody');

    students.forEach(function (stu) {
        var newRow = document.createElement('tr');

        var sid = stu.sid;
        var name = stu.name;
        var gender = stu.gender;
        var hobby = stu.hobby;
        var preference = stu.preference;
        var grade = stu.grade;

        newRow.innerHTML = `
            <td>${sid}</td>
            <td>${name}</td>
            <td>${gender}</td>
            <td>${hobby}</td>
            <td>${preference}</td>
            <td>${grade}</td>
            <td>
                <button id="view-profile-btn">view</button><br>
            </td>
        `;

        tableBody.appendChild(newRow);
    });
}

