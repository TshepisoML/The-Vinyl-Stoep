

// Create an empty cart
let cart = [];


if (localStorage.getItem("vinylCart")) {
    cart = JSON.parse(localStorage.getItem("vinylCart"));
}

// Add an item to the shopping cart
function addToCart(name, price) {

    const product = {
        name: name,
        price: Number(price)
    };

    cart.push(product);

    // Save cart in the browser
    localStorage.setItem("vinylCart", JSON.stringify(cart));

    alert(name + " has been added to your cart!");

    updateCart();
}



function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartCount = document.getElementById("cartCount");

    // Stop if the cart elements do not exist on the page
    if (!cartItems) {
        return;
    }

    // Clear the current cart display
    cartItems.innerHTML = "";

    let total = 0;

    // Display every product in the cart
    cart.forEach(function(product, index) {

        total += product.price;

        const item = document.createElement("div");

        item.innerHTML = `
            <p>
                <strong>${product.name}</strong>
                - R${product.price.toFixed(2)}
                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </p>
        `;

        cartItems.appendChild(item);
    });

    // Display the total price
    if (cartTotal) {
        cartTotal.textContent = "R" + total.toFixed(2);
    }

    // Display the number of products in the cart
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}



function removeFromCart(index) {

    cart.splice(index, 1);

    // Save the updated cart
    localStorage.setItem("vinylCart", JSON.stringify(cart));

    updateCart();
}



function clearCart() {

    const confirmation = confirm(
        "Are you sure you want to remove all items from your cart?"
    );

    if (confirmation) {

        cart = [];

        localStorage.removeItem("vinylCart");

        updateCart();
    }
}




function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty. Please add an item before checking out.");

        return;
    }

    let total = 0;

    cart.forEach(function(product) {
        total += product.price;
    });

    const confirmation = confirm(
        "Your total is R" +
        total.toFixed(2) +
        ". Would you like to proceed to payment?"
    );

    if (confirmation) {

        alert(
            "Thank you for shopping with The Vinyl Stoep!\n\n" +
            "Payment successful.\n" +
            "Total paid: R" + total.toFixed(2)
        );

        // Empty the cart after payment
        cart = [];

        localStorage.removeItem("vinylCart");

        updateCart();
    }
}




function searchProducts() {

    const searchInput = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const products = document.querySelectorAll(".product");

    products.forEach(function(product) {

        const productText = product.textContent.toLowerCase();

        if (productText.includes(searchInput)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";
        }
    });
}



function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Show or hide the back-to-top button
window.addEventListener("scroll", function() {

    const topButton = document.getElementById("topButton");

    if (topButton) {

        if (window.scrollY > 300) {

            topButton.style.display = "block";

        } else {

            topButton.style.display = "none";
        }
    }
});



document.addEventListener("DOMContentLoaded", function() {

    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(function(question) {

        question.addEventListener("click", function() {

            const answer =
                this.nextElementSibling;

            // Show or hide the answer
            if (answer.style.display === "block") {

                answer.style.display = "none";

            } else {

                answer.style.display = "block";
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {

    const currentPage =
        window.location.pathname.split("/").pop();

    const navigationLinks =
        document.querySelectorAll("nav a");

    navigationLinks.forEach(function(link) {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {

            link.classList.add("active-page");
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {

    // Update the cart when the page loads
    updateCart();
});



function toggleCart() {

    const shoppingCart =
        document.getElementById("shoppingCart");

    shoppingCart.classList.toggle("show-cart");
}



let currentArrival = 0;

function showArrival(index) {

    const slides =
        document.querySelectorAll(".arrival-slide");

    // Stop if there are no slides on the page
    if (slides.length === 0) {
        return;
    }

    // Hide all slides
    slides.forEach(function(slide) {
        slide.style.display = "none";
    });

    // Keep the slideshow within the available slides
    if (index >= slides.length) {
        currentArrival = 0;
    }

    if (index < 0) {
        currentArrival = slides.length - 1;
    }

    slides[currentArrival].style.display = "block";
}


function nextArrival() {

    currentArrival++;

    showArrival(currentArrival);
}


function previousArrival() {

    currentArrival--;

    showArrival(currentArrival);
}


// Show the first arrival when the page opens
document.addEventListener("DOMContentLoaded", function() {

    showArrival(currentArrival);
});


function filterNewArrivals(genre) {

    const slides =
        document.querySelectorAll(".arrival-slide");

    // Show all records
    if (genre === "all") {

        currentArrival = 0;

        showArrival(currentArrival);

        return;
    }

    // Find records matching the selected genre
    const matchingSlides = [];

    slides.forEach(function(slide) {

        if (slide.dataset.genre === genre) {
            matchingSlides.push(slide);
        }
    });

    // Hide every slide first
    slides.forEach(function(slide) {
        slide.style.display = "none";
    });

    // Show the first matching record
    if (matchingSlides.length > 0) {

        matchingSlides[0].style.display = "block";

    } else {

        alert(
            "There are currently no new arrivals in this genre."
        );
    }
}


function openQuickView(index) {

    const slides =
        document.querySelectorAll(".arrival-slide");

    const selectedSlide = slides[index];

    const artist =
        selectedSlide.dataset.artist;

    const album =
        selectedSlide.dataset.album;

    const year =
        selectedSlide.dataset.year;

    const price =
        selectedSlide.dataset.price;

    const condition =
        selectedSlide.dataset.condition;

    const image =
        selectedSlide.querySelector("img").src;

    const quickViewDetails =
        document.getElementById("quickViewDetails");

    quickViewDetails.innerHTML = `

        <img src="${image}"
             alt="${artist} - ${album}">

        <h2>${artist}</h2>

        <p><strong>Album:</strong> ${album}</p>

        <p><strong>Release Year:</strong> ${year}</p>

        <p><strong>Condition:</strong> ${condition}</p>

        <p><strong>Price:</strong> R${price}.00</p>

        <button onclick="addToCart('${artist} - ${album}', ${price})">
            Add to Cart
        </button>
    `;

    document
        .getElementById("quickViewModal")
        .style.display = "flex";
}


function closeQuickView() {

    document
        .getElementById("quickViewModal")
        .style.display = "none";
}



function toggleCart() {

    const shoppingCart =
        document.getElementById("shoppingCart");

    shoppingCart.classList.toggle("show-cart");
}


function searchHomePage() {

    const searchInput =
        document.getElementById("homeSearchInput");

    const searchResults =
        document.getElementById("searchResults");

    const searchTerm =
        searchInput.value.toLowerCase().trim();

    const searchableItems =
        document.querySelectorAll(".searchable-item");

    
    searchResults.innerHTML = "";

   
    if (searchTerm === "") {

        searchResults.innerHTML =
            "<p>Please enter something to search for.</p>";

        return;
    }

    let resultsFound = false;

    searchableItems.forEach(function (item) {

        const searchableText =
            item.dataset.search.toLowerCase();

        // Check whether the item matches the search
        if (searchableText.includes(searchTerm)) {

            resultsFound = true;

            
            const result = item.cloneNode(true);

            result.classList.add("search-result");

            searchResults.appendChild(result);
        }
    });

    // Show a message when there are no results
    if (!resultsFound) {

        searchResults.innerHTML =
            "<p>No results found. Try searching for an artist, genre, release or event.</p>";
    }
}



document.addEventListener("DOMContentLoaded", function () {

    const homeSearchInput =
        document.getElementById("homeSearchInput");

    if (homeSearchInput) {

        homeSearchInput.addEventListener("keypress", function (event) {

            if (event.key === "Enter") {

                searchHomePage();
            }
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {

    const galleryImages = document.querySelectorAll(".gallery-image");

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {

            
            const popup = document.createElement("div");
            popup.classList.add("image-popup");

            
            const largeImage = document.createElement("img");
            largeImage.src = this.src;
            largeImage.alt = this.alt;

            
            const closeButton = document.createElement("button");
            closeButton.classList.add("close-popup");
            closeButton.innerHTML = "&times;";
            closeButton.setAttribute("aria-label", "Close image");

           
            popup.appendChild(largeImage);
            popup.appendChild(closeButton);

            
            document.body.appendChild(popup);

            
            document.body.style.overflow = "hidden";

            
            function closeImage() {
                popup.remove();
                document.body.style.overflow = "";
                document.removeEventListener("keydown", escapeKey);
            }

            // Close using button
            closeButton.addEventListener("click", closeImage);

            // Close by clicking outside the image
            popup.addEventListener("click", function (event) {
                if (event.target === popup) {
                    closeImage();
                }
            });

          
            function escapeKey(event) {
                if (event.key === "Escape") {
                    closeImage();
                }
            }

            document.addEventListener("keydown", escapeKey);

        });

    });

});



// ==========================================
// THE VINYL STOEP - INQUIRY EMAIL SYSTEM
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const inquiryForm = document.getElementById("inquiryForm");
    const formMessage = document.getElementById("formMessage");
    const submitButton = document.getElementById("submitButton");

    if (!inquiryForm) {
        return;
    }

    inquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (typeof emailjs === "undefined") {
            formMessage.textContent = "Email service is not loaded.";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formMessage.textContent = "Sending your inquiry...";

        emailjs.sendForm(
            "service_ba03xxu",
            "template_z6zvkm4",
            inquiryForm
        )

        .then(function (response) {

            console.log("EMAIL SENT:", response);

            formMessage.textContent =
                "Thank you! Your inquiry has been sent successfully.";

            inquiryForm.reset();

        })

        .catch(function (error) {

            console.error("EMAILJS ERROR:", error);

            formMessage.textContent =
                "Email failed: " +
                (error.text || error.message || "Please try again.");

        })

        .finally(function () {

            submitButton.disabled = false;
            submitButton.textContent = "Submit Inquiry";

        });

    });

});



// ===================================
// CONTACT US PAGE JAVASCRIPT
// ===================================


// 1. BACK TO TOP BUTTON

const topButton = document.getElementById("topButton");

// Show button when visitor scrolls down

window.addEventListener("scroll", function () {

    if (topButton) {

        if (window.scrollY > 300) {
            topButton.style.display = "block";
        } else {
            topButton.style.display = "none";
        }

    }

});


// Scroll smoothly to the top

function scrollToTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// 2. EMAIL CONFIRMATION

const emailLink = document.querySelector('a[href^="mailto:"]');

if (emailLink) {

    emailLink.addEventListener("click", function () {

        alert("Thank you for contacting The Vinyl Stoep! Your email application will open shortly.");

    });

}


// 3. PHONE CONFIRMATION

const phoneLink = document.querySelector('a[href^="tel:"]');

if (phoneLink) {

    phoneLink.addEventListener("click", function () {

        alert("You are about to contact The Vinyl Stoep.");

    });

}


// 4. CURRENT STORE STATUS

function updateStoreStatus() {

    const statusElement = document.getElementById("storeStatus");

    if (!statusElement) return;

    const now = new Date();

    // South African local time
    const localTime = new Date(
        now.toLocaleString("en-US", {
            timeZone: "Africa/Johannesburg"
        })
    );

    const day = localTime.getDay();

    const currentMinutes =
        localTime.getHours() * 60 + localTime.getMinutes();

    let openingTime;
    let closingTime;

    // Monday to Friday: 10:00 - 16:00
    if (day >= 1 && day <= 5) {
        openingTime = 10 * 60;
        closingTime = 16 * 60;
    }

    // Saturday: 10:00 - 15:00
    else if (day === 6) {
        openingTime = 10 * 60;
        closingTime = 15 * 60;
    }

    // Sunday: 10:00 - 14:00
    else {
        openingTime = 10 * 60;
        closingTime = 14 * 60;
    }

    if (
        currentMinutes >= openingTime &&
        currentMinutes < closingTime
    ) {
        statusElement.textContent = "We are currently OPEN";
        statusElement.style.color = "green";
    } else {
        statusElement.textContent = "We are currently CLOSED";
        statusElement.style.color = "red";
    }

}

updateStoreStatus();
