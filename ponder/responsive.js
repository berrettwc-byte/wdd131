/* 
get the elements that we want to modify
figure out when the modification should occur
for each element
    figure out which one it is
    output that number


figure out where/how we will display the message...get a reference
figure out what day it is
update the display
*/
function displayWelcome() {
    const headerEl = document.querySelector("header");
    const dayIndex = new Date().getDay();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    days[dayIndex]
    const message = `Happy ${days[dayIndex]}`
    const messageEl = document.createElement("p");
    messageEl.textContent = message;
    headerEl.append(messageEl);
}

function renderNumber(element, index) {
    const number = document.createElement("span");
    number.textContent = index + 1;
    element.prepend(number);
}


function addIndex() {
    const scriptureElements = document.querySelectorAll(".scripture")
    scriptureElements.forEach(renderNumber);
}

function toggleMenu() {
    navEl.classList.toggle("hide");
    menuBtn.classList.toggle("change");
}


addIndex()
displayWelcome()

// Target the menu button and the navigation.
// Add a click event listener to the menu button
// When the event happens:
//     Add and remove the hidden class from the nav.
//     Add and remove a class to change how the menu button looks.


const menuBtn = document.querySelector(".menu-btn")
const navEl = document.querySelector(".main-nav");

menuBtn.addEventListener("click", toggleMenu);