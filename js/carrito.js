document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((product, index) => {
            total += product.price * product.quantity;
            cartItems.innerHTML += `
    <li class="list-group-item d-flex align-items-center justify-content-between">
        <div class="cart-item-name flex-grow-1">${product.name}</div>
        <div class="cart-item-controls d-flex align-items-center">
            <input type="number" class="form-control qty-input mx-2 text-center" 
                data-index="${index}" value="${product.quantity}" min="1">
            <span class="fw-bold text-nowrap">$${(product.price * product.quantity).toFixed(2)}</span>
            <button class="btn btn-danger btn-sm remove-item" data-index="${index}">🗑️</button>
        </div>
    </li>
`;

        });

        cartTotal.textContent = total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
        attachEvents();
    }

    function attachEvents() {
        // Eliminar producto
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                updateCart();
            });
        });

        // Actualizar cantidad manualmente
        document.querySelectorAll(".qty-input").forEach(input => {
            input.addEventListener("change", function () {
                const index = this.getAttribute("data-index");
                let newQuantity = parseInt(this.value);
                if (isNaN(newQuantity) || newQuantity < 1) {
                    newQuantity = 1; // Evita valores inválidos
                }
                cart[index].quantity = newQuantity;
                updateCart();
            });
        });
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price"));

            const item = cart.find(product => product.name === name);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    document.getElementById("clear-cart").addEventListener("click", function () {
        cart = [];
        updateCart();
    });

    document.getElementById("checkout").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        alert("Gracias por tu compra 🎉");
        cart = [];
        updateCart();
    });

    updateCart();
});
document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");


    // Función para actualizar el carrito
    document.getElementById("checkout").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("El carrito está vacío.");
            return;
        }
        // Lógica de checkout, por ejemplo, redirigir al usuario
        window.location.href = "/checkout"; // O lo que corresponda en tu sistema.
        alert("Gracias por tu compra 🎉");
        cart = [];
        updateCart();
    });
    
    

    // Agregar al carrito
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            cart.push({ name, price });
            updateCart();
        });
    });

    // Vaciar carrito
    document.getElementById("clear-cart").addEventListener("click", () => {
        cart.length = 0;
        updateCart();
    });
});
function handleCartEvent(event) {
    const button = event.target;
    const index = button.getAttribute("data-index");

    if (button.classList.contains("remove-item")) {
        cart.splice(index, 1);
    } else if (button.classList.contains("qty-input")) {
        let newQuantity = parseInt(button.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
            newQuantity = 1;
        }
        cart[index].quantity = newQuantity;
    }

    updateCart();
}
document.addEventListener("click", function(event) {
    if (event.target.matches(".remove-item, .qty-input")) {
        handleCartEvent(event);
    }
});
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const name = this.getAttribute("data-name");
        const price = parseFloat(this.getAttribute("data-price"));

        const item = cart.find(product => product.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    });
});
document.getElementById("checkout").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    // Lógica de checkout, por ejemplo, redirigir al usuario
    window.location.href = "/checkout"; // O lo que corresponda en tu sistema.
    alert("Gracias por tu compra 🎉");
    cart = [];
    updateCart();
});


