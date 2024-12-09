document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".scroll-fade");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    });
    elements.forEach((el) => observer.observe(el));
});

const themeToggleButton = document.querySelector('.theme-toggle');
    // change the theme
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = document.body.classList.contains('dark-mode') ? '🌞' : '🌙';
        themeToggleButton.textContent = icon;
    });

    // loading script 

    window.addEventListener('load', function() {
        document.getElementById('loading').style.display = 'none';
    });
    

    // when scroll the page .
    
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in-element');
    elements.forEach(function(element) {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const basketBtn = document.getElementById("basket-toggle");
    const closeBasketBtn = document.getElementById("close-basket");
    const basket = document.getElementById("basket");
    const basketList = document.getElementById("basket-list");
    const subscribeButtons = document.querySelectorAll(".course-btn");

    let basketItems = JSON.parse(localStorage.getItem("basketItems")) || [];

    // Render basket items
    function renderBasket() {
        basketList.innerHTML = "";
        basketItems.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.title}
                <button data-index="${index}">Remove</button>
            `;
            basketList.appendChild(li);
        });
        localStorage.setItem("basketItems", JSON.stringify(basketItems));
    }

    // Add course to basket
    subscribeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".course-card");
            const courseId = card.getAttribute("data-id");
            const courseTitle = card.querySelector(".course-title").textContent;

            const item = { id: courseId, title: courseTitle };

            // Avoid duplicates
            if (!basketItems.some((i) => i.id === courseId)) {
                basketItems.push(item);
                renderBasket();
            }
        });
    });

    // Remove item from basket
    basketList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const index = e.target.getAttribute("data-index");
            basketItems.splice(index, 1);
            renderBasket();
        }
    });

    // Show and hide basket
    basketBtn.addEventListener("click", () => {
        basket.classList.add("show");
    });

    closeBasketBtn.addEventListener("click", () => {
        basket.classList.remove("show");
    });

    // Initial render
    renderBasket();
});
