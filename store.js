document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buy-btn");
    const checkoutSection = document.getElementById("checkout");
    const selectedProduct = document.getElementById("selectedProduct");
    const checkoutForm = document.getElementById("checkoutForm");
    let productName = "";
    let productPrice = "";

    // Handle Buy Button Click
    buyButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card");
            productName = productCard.dataset.product;
            productPrice = productCard.dataset.price;

            selectedProduct.textContent = `You selected: ${productName} ($${productPrice})`;
            checkoutSection.classList.remove("hidden");
        });
    });

    // Handle Form Submission
    checkoutForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const waNumber = document.getElementById("waNumber").value;
        const message = `Hello, I want to order:\n\nProduct: ${productName}\nPrice: $${productPrice}\n\nPlease confirm.`;

        // Kirim pesanan ke server
        const response = await fetch("/store/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Customer", // Anda bisa menambahkan input nama pelanggan jika perlu
                email: "customer@example.com", // Menambahkan email atau data lain jika diperlukan
                product: productName,
                waNumber: waNumber
            })
        });

        if (response.ok) {
            alert("Order placed successfully! We'll contact you on WhatsApp.");
            checkoutForm.reset();
            checkoutSection.classList.add("hidden");
        } else {
            alert("Failed to place order.");
        }
    });
});