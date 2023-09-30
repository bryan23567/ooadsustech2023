function openChat() {
    const chatToolbox = document.getElementById('chat-toolbox');
    chatToolbox.style.display = 'block';
}

function openProfile() {
    const profilePage = document.getElementById('profile-page');
    profilePage.style.display = 'block';
}
function enlargeMap() {
    // Implement code to enlarge the map here
    alert("Map enlarged!"); // Replace this with actual functionality
}
const enlargeToggle = document.getElementById('enlarge-toggle');
const backgroundImages = [
    'url(library/map/campus-map.png)',
    'url(library/map/campus-map-collegearea-enlarge.png)',
]; // Add the paths to your background images

let currentImageIndex = 0;

enlargeToggle.addEventListener('change', () => {
    if (enlargeToggle.checked) {
        // Toggle to the next background image
        currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        document.body.style.backgroundImage = backgroundImages[currentImageIndex];
    } else {
        // Toggle back to the original background
        document.body.style.backgroundImage = backgroundImages[0];
    }
});
