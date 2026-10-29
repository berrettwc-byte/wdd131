const form = document.querySelector("#ticket-form");
const typeSelect = document.querySelector("#type");
const extraField = document.querySelector("#extra-field");
const extraLabel = document.querySelector("#extra-label");
const extraInput = document.querySelector("#extra-input");
const errorBox = document.querySelector("#errors");
const ticketBox = document.querySelector("#ticket");

const GUEST_CODE = "EVENT131";

// Show the extra field on the form and change its label depending on the type chosen
function updateExtraField() {
  const value = typeSelect.value;

  // Start fresh each time the type changes
  extraInput.value = "";
  extraInput.classList.remove("invalid");

  if (value === "student") {
    extraLabel.textContent = "Student I#";
    extraInput.maxLength = 9;
    extraInput.inputMode = "numeric";
    extraInput.placeholder = "9-digit number";
    extraField.hidden = false;
  }
  else if (value === "guest") {
    extraLabel.textContent = "Access Code";
    extraInput.removeAttribute("maxlength");
    extraInput.inputMode = "text";
    extraInput.placeholder = "";
    extraField.hidden = false;
  }
  else {
    extraField.hidden = true;
  }
}

typeSelect.addEventListener("change", updateExtraField);
updateExtraField();


// Turn "2026-10-29" into "Thursday, October 29, 2026" without the timezone shifting the day
function formatDate(value) {
  const parts = value.split("-").map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Keeps anything the user typed from being read as HTML when it goes in the ticket
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const firstName = form.querySelector("#first-name");
  const lastName = form.querySelector("#last-name");
  const email = form.querySelector("#email");
  const eventDate = form.querySelector("#event-date");
  const type = typeSelect.value;
  const extraValue = extraInput.value.trim();

  // Clear anything left over from the last submit
  errorBox.textContent = "";
  errorBox.hidden = true;
  ticketBox.textContent = "";
  ticketBox.hidden = true;
  form.querySelectorAll(".invalid").forEach(field => field.classList.remove("invalid"));

  // Validate the input
  // Collect every problem so the user can see them all at once below the form
  const errors = [];
  const badFields = [];

  function addError(message, field) {
    errors.push(message);
    badFields.push(field);
  }

  if (firstName.value.trim() === "") {
    addError("First name is required.", firstName);
  }

  if (lastName.value.trim() === "") {
    addError("Last name is required.", lastName);
  }

  // Email is optional, but if they typed one it needs to look right
  if (email.value.trim() !== "" && !email.checkValidity()) {
    addError("Please enter a valid email address.", email);
  }

  if (type === "") {
    addError("Please choose a type (Student or Guest).", typeSelect);
  }

  if (eventDate.value === "") {
    addError("Please choose an event date.", eventDate);
  }

  // Students need a 9 digit I number
  if (type === "student") {
    if (extraValue === "") {
      addError("Student I# is required.", extraInput);
    }
    else if (!/^\d{9}$/.test(extraValue)) {
      addError("Student I# must be exactly 9 digits (numbers only).", extraInput);
    }
  }

  // Guests need the event code
  if (type === "guest") {
    if (extraValue === "") {
      addError("Access Code is required.", extraInput);
    }
    else if (extraValue.toUpperCase() !== GUEST_CODE) {
      addError("That Access Code is not valid.", extraInput);
    }
  }

  // If there are errors, show them below the form and stop
  if (errors.length > 0) {
    errorBox.innerHTML = `
    <p>Please fix the following:</p>
    <ul>
      ${errors.map(message => `<li>${message}</li>`).join("")}
    </ul>
    `;
    errorBox.hidden = false;
    badFields.forEach(field => field.classList.add("invalid"));
    badFields[0].focus();
    return;
  }

  // Everything is valid, so build the ticket
  const ticketNumber = "TKT-" + Math.floor(100000 + Math.random() * 900000);
  const isStudent = type === "student";
  const emailLine = email.value.trim() !== ""
    ? `<dt>Email</dt><dd>${escapeHTML(email.value.trim())}</dd>`
    : "";

  ticketBox.innerHTML = `
  <h2>Your Ticket</h2>
  <dl>
    <dt>Ticket #</dt><dd>${ticketNumber}</dd>
    <dt>Name</dt><dd>${escapeHTML(firstName.value.trim())} ${escapeHTML(lastName.value.trim())}</dd>
    ${emailLine}
    <dt>Type</dt><dd>${isStudent ? "Student" : "Guest"}</dd>
    <dt>${isStudent ? "Student I#" : "Access Code"}</dt><dd>${escapeHTML(isStudent ? extraValue : GUEST_CODE)}</dd>
    <dt>Event Date</dt><dd>${formatDate(eventDate.value)}</dd>
  </dl>
  `;
  ticketBox.hidden = false;

  form.reset();
  updateExtraField();
});
