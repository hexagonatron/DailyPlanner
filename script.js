//Selecting page elements
const timeContainer = document.querySelector(".time-block-container");
const currentDateEl = document.querySelector("#currentDay");
const nextBtn = document.querySelector(".btn-next");
const prevBtn = document.querySelector(".btn-prev");

//Function that creates all the hour rows given a particular day
const createDateBlock = (date) => {
    
    //sets title date to what's being displayed
    currentDateEl.innerText = date.format("dddd Do MMMM");

    //Clears existing rows on page
    timeContainer.innerHTML = "";

    //Creates outer div and adds class
    var dateOuterDiv = document.createElement("div");
    dateOuterDiv.classList.add("time-block");

    //loads previous events from local storage and converts back from string
    var storedData = localStorage.getItem("DailyPlannerData");
    storedData = JSON.parse(storedData);

    //If nothing in local storage i.e. if first time page is loaded setup local storage obj
    if (!storedData) { storedData = {} };

    //iterate through all hours of day
    for (let i = 0; i <= 23; i++) {

        //creates moment obj for passed in date at hour i
        let labelDate = date.hour(i);

        //creating row div
        let hourRow = document.createElement("div");
        hourRow.classList.add("row");

        //creating row hour label div
        let hourLabel = document.createElement("div");
        hourLabel.classList.add("hour", "col-2");
        //formats hour correctly
        hourLabel.innerText = labelDate.format("h a");

        //creates main description div
        let hourDescription = document.createElement("div");
        hourDescription.classList.add("description", "col-8");
        //Allows user to type in things
        hourDescription.setAttribute("contenteditable", true);
        //Assigning data attribute so that box can be targeted later
        hourDescription.setAttribute("data-hour", i);
        //assigning class based on if this date is in the past present or future
        let descriptionClass = labelDate.isBefore(moment(), 'hour')
            ? "past"
            : labelDate.isSame(moment(), 'hour')
                ? "present"
                : "future";

        hourDescription.classList.add(descriptionClass);

        //Check if there is an entry for the current date
        if (storedData[date.format("YYYY-MM-DD")]) {

            //If there's an entry for current date check if there's an entry for current time
            if (storedData[date.format("YYYY-MM-DD")][i]) {

                //If there is an entry add entry to div text
                hourDescription.innerText = storedData[date.format("YYYY-MM-DD")][i];
            }
        }

        //Creating save button
        let saveBtn = document.createElement("div");
        saveBtn.classList.add("saveBtn", "col-2");
        //data attribute to use later
        saveBtn.setAttribute("data-hour", i);
        //assigning click event handler
        saveBtn.addEventListener("click", saveData);

        //appending col elements to row
        hourRow.appendChild(hourLabel);
        hourRow.appendChild(hourDescription);
        hourRow.appendChild(saveBtn);

        //Appending row to page for display
        timeContainer.appendChild(hourRow);

    }

}

//Save button Fn
const saveData = (event) => {

    //load data from local storage and convert from string
    let savedData = localStorage.getItem("DailyPlannerData");
    savedData = JSON.parse(savedData);

    //finds the div text to save based on the button data attribute
    let dataToSave = document.querySelector(`div[data-hour="${event.currentTarget.dataset.hour}"]`).innerText;

    //if no data in local storage initialise object
    if (!savedData) {
        savedData = {};
    }

    //if no entry for that day then initialise as empty array
    if (!savedData[displayDate.format("YYYY-MM-DD")]) {
        savedData[displayDate.format("YYYY-MM-DD")] = [];
    }

    //Sets the object at correct date key and hour index of array
    savedData[displayDate.format("YYYY-MM-DD")][event.currentTarget.dataset.hour] = dataToSave;

    //send data back to local storage
    savedData = JSON.stringify(savedData);
    localStorage.setItem("DailyPlannerData", savedData);
}

//Sets data to display as current date
let displayDate = moment();

//on page load set date to display as current date and call the display function

createDateBlock(displayDate);


//Attaching event listeners to next and prev buttons
nextBtn.addEventListener("click", (e) => {
    //adds 1 day to the display date then calls display function
    displayDate.add(1, 'd');
    createDateBlock(displayDate);
});

prevBtn.addEventListener("click", (e) => {
    //subtracts a day from display date and calls display function
    displayDate.subtract(1, 'd');
    createDateBlock(displayDate);
});