const backgroundImage = document.getElementById('background-image');
const markedPointsContainer = document.getElementById('marked-points-container');
const popup = document.getElementById('popup');
const pointForm = document.getElementById('point-form');
const coordinates = document.getElementById('coordinates');
let x, y, imageX, imageY; // Declare x and y variables
const markedPointsInfo = [];

// Add an event listener for mousemove to display coordinates
backgroundImage.addEventListener('mousemove', (m) => {
    x = m.clientX;
    y = m.clientY;
    
    // Calculate image coordinates
    imageX = (x / window.innerWidth) * 100;
    imageY = (y / window.innerHeight) * 100;

    // Update and display the coordinates
    coordinates.innerText = `X: ${x}, Y: ${y} | Image X: ${imageX.toFixed(2)}%, Image Y: ${imageY.toFixed(2)}%`;

    /* Position the coordinates display near the cursor
    coordinates.style.left = x + 'px';
    coordinates.style.top = y + 'px';*/
});

// Add an event listener for click to show the form
backgroundImage.addEventListener('click', (c) => {
    console.log('Clicked on background image'); // Debugging line

    //x = c.clientX; // Store x and y coordinates
    //y = c.clientY;

    // Show the form at the clicked coordinates
    popup.style.display = 'block';

    // Pre-fill the coordinates in the form
    document.getElementById('point-name').value = `X: ${x}, Y: ${y}`;
});

// Add an event listener for form submission
pointForm.addEventListener('submit', (s) => {
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

    // Create a clickable marked point on the image
    const markedPoint = document.createElement('a');
    markedPoint.className = 'marked-point';
    markedPoint.style.left = x + 'px';
    markedPoint.style.top = y + 'px';
    markedPoint.href = buildingnumber + '.html'; // Set the href to the desired page

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
/*
    // Create a button representing the marked point
    const markedPointButton = document.createElement('button');
    markedPointButton.innerText = pointname;

    // Add a click event listener to the button to display the information
    markedPointButton.addEventListener('click', () => {
        const infoString = `
            Point Name: ${pointname}
            Building Name: ${buildingname}
            Building Number: ${buildingnumber}
            College Name: ${collegename}
            Total Floor: ${totalfloor}
            Description: ${description}
        `;
        alert(infoString);
    });

    // Append the button to the marked points container
    markedPointsContainer.appendChild(markedPointButton);
*/
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
