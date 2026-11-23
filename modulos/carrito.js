export let productosCarrito = [];

export function agregarProductoAlCarrito(id, nombre, precio, imagen) {
    const existente = productosCarrito.find(p => String(p.id) === String(id));

    if (existente) {
        existente.cantidad++;
    } else {
        productosCarrito.push({
            id,
            nombre,
            precio,
            imagen,
            cantidad: 1
        });
    }

    renderizarProductosCarrito();
}

export function sumarCantidad(id) {
    const prod = productosCarrito.find(p => String(p.id) === String(id));
    if (prod) {
        prod.cantidad++;
        renderizarProductosCarrito();
    }
}

export function disminuirCantidad(id) {
    const prod = productosCarrito.find(p => String(p.id) === String(id));
    if (!prod) return;

    prod.cantidad--;
    if (prod.cantidad <= 0) {
        eliminarProducto(id);
        return;
    }
    renderizarProductosCarrito();
}

export function eliminarProducto(id) {
    productosCarrito = productosCarrito.filter(p => String(p.id) !== String(id));
    renderizarProductosCarrito();
}

export function renderizarProductosCarrito() {
    const contenedor = document.getElementById("productos-carrito");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productosCarrito.forEach(prod => {
        const subtotal = prod.precio * prod.cantidad;

        const card = document.createElement("div");
        card.classList.add("producto-carrito-card");

        const info = document.createElement("div");
        info.classList.add("producto-carrito-info");

        const img = document.createElement("img");
        img.src = prod.imagen || "";
        img.alt = prod.nombre;

        const datos = document.createElement("div");
        datos.classList.add("producto-carrito-datos");

        const titulo = document.createElement("h4");
        titulo.innerText = prod.nombre;

        const detalle = document.createElement("span");
        detalle.innerText = `Precio: $${prod.precio} | Cantidad: ${prod.cantidad} | Subtotal: $${subtotal}`;

        datos.appendChild(titulo);
        datos.appendChild(detalle);
        info.appendChild(img);
        info.appendChild(datos);

        const botones = document.createElement("div");
        botones.classList.add("producto-carrito-botones");

        const btnDisminuir = document.createElement("button");
        btnDisminuir.type = "button";
        btnDisminuir.classList.add("btn-menos");
        btnDisminuir.innerText = "-";
        btnDisminuir.addEventListener("click", () => disminuirCantidad(prod.id));

        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.classList.add("btn-quitar");
        btnEliminar.innerText = "Eliminar";
        btnEliminar.addEventListener("click", () => eliminarProducto(prod.id));

        const btnSumar = document.createElement("button");
        btnSumar.type = "button";
        btnSumar.classList.add("btn-mas");
        btnSumar.innerText = "+";
        btnSumar.addEventListener("click", () => sumarCantidad(prod.id));

        botones.appendChild(btnDisminuir);
        botones.appendChild(btnEliminar);
        botones.appendChild(btnSumar);

        card.appendChild(info);
        card.appendChild(botones);
        contenedor.appendChild(card);
    });
}