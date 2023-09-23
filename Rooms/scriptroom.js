function addFacilityBuilding(){
    console.log("Add Facility Floor!")
    var name = document.getElementById("facility-name-floor").value;
    var amount = document.getElementById("facility-amount-floor").value;

    const table = document.getElementById(".table-building");

    const row = table.insertRow(-1);
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = 'Floor ' + amount;
    row.insertCell(2).innerHTML = `
    <button>edit</button>
    <button class="delete-facility-building" onclick="deleteRow(this)">delete</button>
    `;
    

    return false;
}


function displayAddFacilityBuilding() {
    var showButton = document.getElementById("add-facilities-building");
    var addFacilityBuildingForm = document.getElementById("facility-building-form");

    if (addFacilityBuildingForm.style.display === "none" || addFacilityBuildingForm.style.display === "") {
        addFacilityBuildingForm.style.display = "block";
    } else {
        addFacilityBuildingForm.style.display = "none";
    }
}

function displayAddPlan(){
    var showButton = document.getElementById("add-plan");
    var addPlanForm = document.getElementById("plan-building-form");

    if(addPlanForm.style.display == "none" || addPlanForm.style.display == ""){
        addPlanForm.style.display = "block";
    }
    else{
        addPlanForm.style.display = "none";
    }

}


function deleteRow(button){
    if(confirm("Are you sure you want to delete?")){
        var row = button.parentNode.parentNode;
        row.remove();
    }
}


  
