// script.js
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('image-container');
    const coordinateForm = document.getElementById('coordinate-form');
    const markedPoints = document.getElementById('marked-points');
    const submitButton = document.getElementById('submit-button');
    const cancelButton = document.getElementById('cancel-button');

    let mouseX, mouseY;

    imageContainer.addEventListener('mousemove', (e) => {
        mouseX = e.pageX - imageContainer.offsetLeft;
        mouseY = e.pageY - imageContainer.offsetTop;
    });

    imageContainer.addEventListener('click', () => {
        // Define your designated coordinates here
        const designatedX = 200; // Change this to your desired X coordinate
        const designatedY = 300; // Change this to your desired Y coordinate

        if (Math.abs(mouseX - designatedX) < 10 && Math.abs(mouseY - designatedY) < 10) {
            // Show the form at the designated coordinates
            coordinateForm.style.display = 'block';

            // Set the hidden input values to the clicked coordinates
            document.getElementById('coordinate-x').value = mouseX;
            document.getElementById('coordinate-y').value = mouseY;
        }
    });

    submitButton.addEventListener('click', () => {
        // Handle form submission and marking the point on the image (you'll need backend processing for this part)
        // After submission, you can add a marked point to the markedPoints div.
        markedPoints.innerHTML += `<div class="marked-point" style="top:${mouseY}px;left:${mouseX}px;"></div>`;
        coordinateForm.style.display = 'none';
    });

    cancelButton.addEventListener('click', () => {
        coordinateForm.style.display = 'none';
    });
});
