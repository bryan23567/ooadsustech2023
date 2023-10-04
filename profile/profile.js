

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
