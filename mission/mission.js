const themeSelector = document.querySelector("#theme-selector");
const body = document.body;
const logo = document.querySelector("#logo");

function changeTheme() {
    const selectedTheme = themeSelector.value;

    if (selectedTheme === "dark") {
        body.classList.add("dark");
        logo.src = "dark-logo.png";
    } 
    else {
        body.classList.remove("dark");
        logo.src = "byui-logo-blue.webp";
    }
}

themeSelector.addEventListener('change', changeTheme);

function changeTheme() {
    const isDark = themeSelector.value === "dark";
    body.classList.toggle("dark", isDark);
    logo.src = isDark ? "images/dark-logo.png" : "images/byui-logo-blue.webp";
}

themeSelector.addEventListener("change", changeTheme);