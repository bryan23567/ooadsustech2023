
//make pop up update info button
const btnUpdateInfo = document.querySelector("#showupdate");
const btnClose = document.querySelector(".close-btn");
const bgPopUp = document.querySelector(".bg-pop-up");

btnUpdateInfo.addEventListener("click", showPopUp);
btnClose.addEventListener("click", closePopUp);

function showPopUp() {
  document.querySelector(".popup").classList.add("active");
  bgPopUp.style.display = "block";
}

function closePopUp() {
  document.querySelector(".popup").classList.remove("active");
  bgPopUp.style.display = "none";
}

//upload profile
const profilePicture = document.getElementById('profile-picture');
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            profilePicture.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});