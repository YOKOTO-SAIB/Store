async function loadOrders() {
    const response = await fetch("orders");
    const orders = await response.json();

    const ordersTable = document.getElementById("ordersTable").querySelector("tbody");
    ordersTable.innerHTML = ""; // Kosongkan tabel

    orders.forEach(order => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.name}</td>
            <td>${order.email}</td>
            <td>${order.product}</td>
            <td><a href="https://wa.me/${order.waNumber}" target="_blank">${order.waNumber}</a></td>
            <td>${order.status}</td>
            <td>
                <button onclick="confirmOrder(${order.id})">Confirm</button>
            </td>
        `;
        ordersTable.appendChild(row);
    });
}

async function confirmOrder(id) {
    const response = await fetch("/admin/order/confirm", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    });

    if (response.ok) {
        alert("Order confirmed!");
        loadOrders();
    } else {
        alert("Failed to confirm order.");
    }
}

document.addEventListener("DOMContentLoaded", loadOrders);