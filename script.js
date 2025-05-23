// Array of background image filenames in the background directory (fetched from directory listing)
const backgroundImages = [
    '001.jpg',
    '003.jpg',
    '004.jpg',
    '10141608.jpg', // Added this based on directory listing
];

let currentImageIndex = 0;

function changeBackground() {
    // Get the body element
    const body = document.body;

    // Construct the image URL
    const imageUrl = `background/${backgroundImages[currentImageIndex]}`;

    // Set the background image
    body.style.backgroundImage = `url('${imageUrl}')`;

    // Move to the next image, loop back if at the end
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
}

// Change background initially and then every 10 seconds
changeBackground(); // Set initial background
setInterval(changeBackground, 10000); // Change every 10000 milliseconds (10 seconds)

// JavaScript for hiding/showing header and footer on scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const mainContent = document.querySelector('main'); // Get the main content element
const scrollThreshold = 50; // Number of pixels to scroll down before hiding the header

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let documentHeight = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;

    // Logic for header (hide on scroll down past threshold, show on scroll up)
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
        header.classList.add('header-hidden');
    } else if (scrollTop < lastScrollTop) {
        header.classList.remove('header-hidden');
    }

    // Logic for main content (show on scroll down past threshold, do not hide on scroll up)
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
         mainContent.classList.remove('main-hidden'); // Show main content after scrolling down past threshold
    }

    // Logic for footer (show only when at the bottom of the page)
    // Add a small tolerance (e.g., 1 or 2 pixels) for browser differences
    if (scrollTop + windowHeight >= documentHeight - 2) {
        // At or very near the bottom of the page
        footer.classList.remove('footer-hidden');
    } else {
        // Not at the bottom of the page
        footer.classList.add('footer-hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
}, false);

// Ensure footer is hidden on page load
footer.classList.add('footer-hidden');

// JavaScript for displaying page size
const pageSizeElement = document.getElementById('page-size');

function displayPageSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    pageSizeElement.textContent = `Page size: ${width}px x ${height}px`;
}

// Display page size on load and resize
displayPageSize();
window.addEventListener('resize', displayPageSize);

// Functionality for the search bar and dynamic content loading
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const bookContainer = document.getElementById('book-container');

    // Define the list of all items (Books, Notes, Question Papers)
    const allItems = [];
    allItems.push('Nepali Class 8'); // Changed Book 1 to Nepali Class 8
    allItems.push('English Class 8'); // Added English Class 8 for Book 2
    for (let i = 3; i <= 40; i++) {
        allItems.push(`Book ${i}`);
    }
    for (let i = 1; i <= 40; i++) {
        allItems.push(`Note ${i}`);
    }
    for (let i = 1; i <= 40; i++) {
        allItems.push(`Question Paper ${i}`);
    }

    // Add 100 more generic items
    for (let i = 121; i <= 220; i++) {
        allItems.push(`Item ${i}`);
    }

    // Function to create an HTML element for a book box
    const createBookBoxElement = (itemName) => {
        const div = document.createElement('div');
        div.classList.add('book-box');
        div.classList.add('book-box-with-cover'); // Add class for styling with cover image
        // Assign a unique ID based on the item name (e.g., book-1, note-5, questionpaper-10)
        const id = itemName.toLowerCase().replace(/ /g, '-');
        div.id = id;
        const a = document.createElement('a');
        a.href = '#'; // Default link
        a.textContent = ''; // Clear default text

        // Removed image element creation
        const textSpan = document.createElement('span');
        textSpan.textContent = itemName; // Set text content

        // Set specific links based on item name
        if (itemName === 'Book 8' || itemName === 'Nepali Class 8') {
            a.href = 'pdf-html5-page-flip-master/web/viewer.html?file=../pdf/class%208/books/%20Nepali_Class_8_Book.pdf'; // Link for Nepali Class 8 Book
            const img = document.createElement('img');
            img.src = '/pdf-html5-page-flip-master/bookcovers/nepaliclass8.png';
            img.alt = itemName + ' Cover';
            a.appendChild(img);
            a.appendChild(document.createElement('br'));
        } else if (itemName === 'English Class 8') {
             a.href = 'pdf-html5-page-flip-master/web/viewer.html?file=../pdf/class%208/books/English-class-8.pdf'; // Link for English Class 8 PDF
             const img = document.createElement('img');
             img.src = '/pdf-html5-page-flip-master/bookcovers/english-claas-8.png';
             img.alt = itemName + ' Cover';
             a.appendChild(img);
             a.appendChild(document.createElement('br'));
        } else {
            // Default case for other items (no specific image)
            // a.href remains '#'
        }

        // Append text to the link
        a.appendChild(textSpan);

        // Append the link to the div
        div.appendChild(a);

        return div;
    };

    // Function to display items in the container
    const displayItems = (itemsToDisplay) => {
        // Clear current content
        bookContainer.innerHTML = '';
        // Append new content
        itemsToDisplay.forEach(item => {
            bookContainer.appendChild(createBookBoxElement(item));
        });
    };

    // Initial display of all items on the home page
    if (bookContainer && window.location.pathname.endsWith('index.html')) {
        displayItems(allItems);
    }

    if (searchInput && searchButton && bookContainer) {
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredItems = allItems.filter(item => item.toLowerCase().includes(searchTerm));
            displayItems(filteredItems);
        };

        // Listen for button click
        searchButton.addEventListener('click', performSearch);

        // Listen for Enter key in the input field
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if it's in a form
                performSearch();
            }
        });

        // Listen for input changes (search as you type)
        searchInput.addEventListener('input', performSearch);
    }
});