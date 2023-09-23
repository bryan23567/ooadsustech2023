function addFacilityFloor(){
    var name = document.getElementById("facility-name-floor").value;
    var amount = document.getElementById("facility-amount-floor").value;

    var newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${name}</td>
        <td>${amount}</td>
        <td>
            <button>edit</button>
            <button class="delete-facility-floor" onclick="deleteRow(this)">delete</button>
        </td>
    `;

    var tableBody = document.getElementsByClassName("table-floor");
    tableBody.appendChild(newRow);

    return false;
}

function deleteRow(button){
    var row = button.parentNode.parentNode;

    row.remove();
}

// script.js
document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("add-occupying");
    var form = document.getElementById("add-occupying-form");

    addButton.addEventListener("click", function () {
        if (form.style.display === "none" || form.style.display === "") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("add-facilities-floor");
    var form = document.getElementById("facility-form");

    addButton.addEventListener("click", function () {
        if (form.style.display === "none" || form.style.display === "") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var addButton = document.getElementById("room-id");
    var form = document.getElementById("occupying-info");

    addButton.addEventListener("click", function () {
        if (form.style.display === "none" || form.style.display === "") {
            form.style.display = "block";
        } else {
            form.style.display = "none";
        }
    });
});

document.getElementById("login-icon").addEventListener("click", function() {
    var dropdownContent = document.getElementById("dropdown-content");
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
  
  // Close the dropdown when clicking outside of it
  window.addEventListener("click", function(event) {
    var dropdownContent = document.getElementById("dropdown-content");
    if (!event.target.matches("#login-icon") && !event.target.matches(".dropdown-content")) {
      dropdownContent.style.display = "none";
    }
  });
  
