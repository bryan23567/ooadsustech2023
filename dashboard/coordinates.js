const backgroundImage = document.getElementById('campus-map');
// Create an image map for clickable areas
const campusMap = document.getElementById('campus-map');
campusMap.useMap = '#housemap';
// Define the map
const map = document.createElement('map');
map.name = 'housemap';

const markedPointsContainer = document.getElementById('marked-points-container');
const popup = document.getElementById('popup');
const pointForm = document.getElementById('point-form');
const coordinates = document.getElementById('coordinates');
let zoomLevel, rect,mouseX, mouseY, x,y,imageX, imageY; // Declare x and y variables
const markedPointsInfo = [];
function getPageZoomLevel() {
    // Create a reference element with a known size (e.g., 1358x1921 pixels)
    const referenceElement = document.createElement('div');
    referenceElement.style.width = '100px';
    referenceElement.style.height = '100px';
    referenceElement.style.position = 'fixed';
    referenceElement.style.top = '-1000px'; // Move the element out of the viewport
    document.body.appendChild(referenceElement);
    
    // Measure the size of the reference element
    const actualWidth = referenceElement.offsetWidth;
    
    // Calculate the zoom level
    const zoomLevel = actualWidth / 100; // Assuming the expected size is 100px
    
    // Remove the reference element
    referenceElement.remove();
    
    return zoomLevel;
}
// Add an event listener for mousemove to display coordinates
backgroundImage.addEventListener('mousemove', (m) => {
    rect = backgroundImage.getBoundingClientRect()
    mouseX = m.clientX - rect.left;
    mouseY = m.clientY - rect.top;
    
    if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
        
    // Cursor is inside the image
        coordinates.innerText = `X: ${mouseX.toFixed(2)}, Y: ${mouseY.toFixed(2)}`;
    } else {
        // Cursor is outside the image
        coordinates.innerText = '';
    }
});

// Add an event listener for click to show the form
backgroundImage.addEventListener('click', (c) => {
    console.log('Clicked on background image'); // Debugging line
    zoomLevel = getPageZoomLevel();
    x=mouseX.toFixed(2);
    y=mouseY.toFixed(2);
    imageX=x/zoomLevel;
    imageY=y/zoomLevel;
    // Show the form at the clicked coordinates
    popup.style.display = 'block';

    // Pre-fill the coordinates in the form
    document.getElementById('point-name').value = `X: ${x}, Y: ${y}`;
});

// Add an event listener for form submission
pointForm.addEventListener('submit', (s) => {
    rect = backgroundImage.getBoundingClientRect()
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
    //xWeb =
    // Create a clickable marked point on the image
    const markedPoint = document.createElement('area');
    markedPoint.className = 'marked-point';
    markedPoint.style.left = `${imageX}px`;//x + 'px';
    markedPoint.style.top = `${imageY}px`;//y + 'px';
    markedPoint.shape='rect';
    markedPoint.coords = `${imageX},${imageY},30,30`; // x, y, width, height
    markedPoint.alt = buildingnumber;
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
