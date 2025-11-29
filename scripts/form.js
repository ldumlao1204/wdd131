// Product Array
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];


// Populate Product Selection
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("product");
    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id; 
            option.textContent = product.name; 
            productSelect.appendChild(option);
        });
    }

    // Review Counter on review.html
    if (window.location.pathname.includes("review.html")) {
        let count = localStorage.getItem("reviewCount");
        count = count ? parseInt(count) + 1 : 1;
        localStorage.setItem("reviewCount", count);

        // Display counter
        const footer = document.querySelector("footer");
        const counterP = document.createElement("p");
        counterP.style.fontWeight = "bold";
        counterP.textContent = `You have submitted ${count} review(s).`;
        footer.appendChild(counterP);;
    }
});


