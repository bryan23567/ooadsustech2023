const backgroundImage = document.getElementById('background-image');
const markedPoints = document.getElementById('marked-points');
const popup = document.getElementById('popup');
const pointForm = document.getElementById('point-form');
const coordinates = document.getElementById('coordinates');
let x, y, imageX, imageY; // Declare x and y variables

// Add an event listener for mousemove to display coordinates
backgroundImage.addEventListener('mousemove', (m) => {
    x = m.clientX;
    y = m.clientY;
    
    // Calculate image coordinates
    imageX = (x / window.innerWidth) * 100;
    imageY = (y / window.innerHeight) * 100;

    // Update and display the coordinates
    coordinates.innerText = `X: ${x}, Y: ${y} | Image X: ${imageX.toFixed(2)}%, Image Y: ${imageY.toFixed(2)}%`;

    // Position the coordinates display near the cursor
    coordinates.style.left = x + 'px';
    coordinates.style.top = y + 'px';
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
    const collegename = document.getElementById('college-name').value;
    const totalfloor = document.getElementById('total-floor').value;
    const description = document.getElementById('building-description').value;

    // Create a clickable marked point on the image
    const markedPoint = document.createElement('div');
    markedPoint.className = 'marked-point';
    markedPoint.style.left = x + 'px';
    markedPoint.style.top = y + 'px';

    // Attach additional data to the marked point (e.g., name, description)
    markedPoint.dataset.pointname = pointname;
    markedPoint.dataset.buildingname = buildingname;
    markedPoint.dataset.collegename = collegename;
    markedPoint.dataset.totalfloor = totalfloor;
    markedPoint.dataset.description = description;

    // Append the marked point to the container
    markedPoints.appendChild(markedPoint);

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
