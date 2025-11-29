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


// Populate Product Select
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("product");
    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id; // value is product id
            option.textContent = product.name; // display is product name
            productSelect.appendChild(option);
        });
    }

    // Review Counter on review.html
    if (window.location.pathname.includes("review.html")) {
        let count = localStorage.getItem("reviewCount");
        count = count ? parseInt(count) + 1 : 1;
        localStorage.setItem("reviewCount", count);

        // Display counter
        const counterDiv = document.createElement("div");
        counterDiv.style.marginTop = "20px";
        counterDiv.style.fontWeight = "bold";
        counterDiv.textContent = `You have submitted ${count} review(s).`;
        document.body.appendChild(counterDiv);
    }
});


