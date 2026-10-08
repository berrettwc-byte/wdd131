
const gallery = document.querySelector('.gallery');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-viewer');

// Event listener for opening the modal
gallery.addEventListener('click', openModal);

function openModal(e) {
// Code to show modal  - Use event parameter 'e' 
console.log(e.target);
console.log("currentTarget", e.currentTarget);

// Figure out wich image was clicked on
const imgClicked = e.target;
const fileName = imgClicked.getAttribute("src"); 
const alt = imgClicked.alt;
// Get the name of the large img
const largeImg = fileName.replace("-sm", "-full");
// Put the correct src path in the dialog
modalImage.src = largeImg;
modalImage.alt = alt;
// Show the dialog
modal.showModal();

}
// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.close();
});

// Close modal if clicking outside the image
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
          