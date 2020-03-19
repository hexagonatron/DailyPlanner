const timeContainer = document.querySelector(".time-block-container");
const currentDateEl = document.querySelector("#currentDay");
const nextBtn = document.querySelector(".btn-next");
const prevBtn = document.querySelector(".btn-prev");


const createDateBlock = (date) => {
    timeContainer.innerHTML = "";
    var dateOuterDiv = document.createElement("div");
    dateOuterDiv.classList.add("time-block");

    var storedData = localStorage.getItem("DailyPlannerData");

    storedData = JSON.parse(storedData);

    if(!storedData){storedData = {}};
    
    for(let i=0; i <= 23; i++){

        let labelDate = date.hour(i);

        let hourRow = document.createElement("div");
        hourRow.classList.add("row");
        
        let hourLabel = document.createElement("div");
        hourLabel.classList.add("hour", "col-2");
        hourLabel.innerText = labelDate.format("h a");
        
        let hourDescription = document.createElement("div");
        hourDescription.classList.add("description", "col-8");
        hourDescription.setAttribute("contenteditable", true);
        hourDescription.setAttribute("data-hour", i);
        let descriptionClass = labelDate.isBefore(currentDate, 'hour')
            ? "past"
            : labelDate.isSame(currentDate, 'hour')
                ? "present"
                : "future";

        hourDescription.classList.add(descriptionClass);    

        if(storedData[date.format("YYYY-MM-DD")]){
            if(storedData[date.format("YYYY-MM-DD")][i]){
                hourDescription.innerText = storedData[date.format("YYYY-MM-DD")][i];
            }
        }

        let saveBtn = document.createElement("div");
        saveBtn.classList.add("saveBtn", "col-2");
        saveBtn.setAttribute("data-hour", i);
        saveBtn.addEventListener("click", saveData);

        hourRow.appendChild(hourLabel);
        hourRow.appendChild(hourDescription);
        hourRow.appendChild(saveBtn);

        timeContainer.appendChild(hourRow);
        
    }
    
}

const saveData = (event) => {
let savedData = localStorage.getItem("DailyPlannerData");

savedData = JSON.parse(savedData);

let dataToSave = document.querySelector(`div[data-hour="${event.currentTarget.dataset.hour}"]`).innerText;

console.log(dataToSave);

if(!savedData){
    savedData = {};
}

if(!savedData[displayDate.format("YYYY-MM-DD")]){
    savedData[displayDate.format("YYYY-MM-DD")] = [];
}

console.log(savedData);

savedData[displayDate.format("YYYY-MM-DD")][event.currentTarget.dataset.hour] = dataToSave;

savedData = JSON.stringify(savedData);

localStorage.setItem("DailyPlannerData", savedData);


}

let displayDate = moment();
let currentDate = moment();

currentDateEl.innerText = displayDate.format("dddd Do MMMM");
createDateBlock(displayDate);

nextBtn.addEventListener("click", (e) => {
    displayDate.add(1, 'd');
    currentDateEl.innerText = displayDate.format("dddd Do MMMM");
    createDateBlock(displayDate);
});

prevBtn.addEventListener("click", (e) => {
    displayDate.subtract(1, 'd');
    currentDateEl.innerText = displayDate.format("dddd Do MMMM");
    createDateBlock(displayDate);
});