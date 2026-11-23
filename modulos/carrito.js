
export let productosCarrito = [];

/* funcion para agregar productos al carrito */
export function agregarProductoAlCarrito(id, nombre, precio, imagen) {

    /* comprobamos si el producto ya existe en el carrito */
    const existente = productosCarrito.find(p => String(p.id) === String(id));

    /* si ya existe aumentamos su cantidad, si no lo agregamos al carrito */
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

    /* actualizamos la vista del carrito */
    renderizarProductosCarrito();
}

/* funcion para aumentar la cantidad de un producto */
export function sumarCantidad(id) {

    /* buscamos el producto correspondiente mediante su id */
    const prod = productosCarrito.find(p => String(p.id) === String(id));

    /* si encontramos el producto aumentamos su cantidad y actualizamos el carrito */
    if (prod) {
        prod.cantidad++;
        renderizarProductosCarrito();
    }
}

/* funcion para disminuir la cantidad de un producto */
export function disminuirCantidad(id) {

    /* buscamos el producto dentro del carrito */
    const prod = productosCarrito.find(p => String(p.id) === String(id));

    /* si no encontramos el producto detenemos la funcion */
    if (!prod) return;

    /* disminuimos la cantidad del producto */
    prod.cantidad--;

    /* si la cantidad llega a cero eliminamos el producto del carrito */
    if (prod.cantidad <= 0) {
        eliminarProducto(id);
        return;
    }

    /* actualizamos la vista del carrito */
    renderizarProductosCarrito();
}

/* funcion para eliminar un producto del carrito */
export function eliminarProducto(id) {

    /* utilizamos filter para crear un nuevo array sin el producto seleccionado */
    productosCarrito = productosCarrito.filter(p => String(p.id) !== String(id));

    /* actualizamos el carrito para mostrar los cambios */
    renderizarProductosCarrito();
}

/* funcion para mostrar los productos del carrito en el HTML */
export function renderizarProductosCarrito() {

    /* buscamos el contenedor donde se van a mostrar los productos */
    const contenedor = document.getElementById("productos-carrito");

    /* si el contenedor no existe detenemos la funcion */
    if (!contenedor) return;

    /* limpiamos el contenido anterior para evitar que se dupliquen los productos */
    contenedor.innerHTML = "";

    /* recorremos todos los productos que tenemos guardados en el carrito */
    productosCarrito.forEach(prod => {

        /* calculamos el subtotal multiplicando el precio por la cantidad */
        const subtotal = prod.precio * prod.cantidad;

        /* creamos la tarjeta principal donde se mostrara cada producto */
        const card = document.createElement("div");
        card.classList.add("producto-carrito-card");

        /* creamos el contenedor que tendra la imagen y los datos del producto */
        const info = document.createElement("div");
        info.classList.add("producto-carrito-info");

        /* creamos la imagen y le asignamos su direccion y texto alternativo */
        const img = document.createElement("img");
        img.src = prod.imagen || "";
        img.alt = prod.nombre;

        /* creamos el contenedor donde se mostrara la informacion del producto */
        const datos = document.createElement("div");
        datos.classList.add("producto-carrito-datos");

        /* creamos un titulo para mostrar el nombre del producto */
        const titulo = document.createElement("h4");
        titulo.innerText = prod.nombre;

        /* mostramos el precio, la cantidad seleccionada y el subtotal */
        const detalle = document.createElement("span");
        detalle.innerText = `Precio: $${prod.precio} | Cantidad: ${prod.cantidad} | Subtotal: $${subtotal}`;

        /* agregamos el titulo y el detalle al contenedor de datos */
        datos.appendChild(titulo);
        datos.appendChild(detalle);

        /* agregamos la imagen y los datos al contenedor de informacion */
        info.appendChild(img);
        info.appendChild(datos);

        /* creamos el contenedor donde se agruparan los botones */
        const botones = document.createElement("div");
        botones.classList.add("producto-carrito-botones");

        /* creamos el boton para disminuir la cantidad del producto */
        const btnDisminuir = document.createElement("button");
        btnDisminuir.type = "button";
        btnDisminuir.classList.add("btn-menos");
        btnDisminuir.innerText = "-";

        /* cuando se presiona el boton ejecutamos la funcion para disminuir la cantidad */
        btnDisminuir.addEventListener("click", () => disminuirCantidad(prod.id));

        /* creamos el boton para eliminar completamente el producto */
        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.classList.add("btn-quitar");
        btnEliminar.innerText = "Eliminar";

        /* cuando se presiona el boton eliminamos el producto del carrito */
        btnEliminar.addEventListener("click", () => eliminarProducto(prod.id));

        /* creamos el boton para aumentar la cantidad del producto */
        const btnSumar = document.createElement("button");
        btnSumar.type = "button";
        btnSumar.classList.add("btn-mas");
        btnSumar.innerText = "+";

        /* cuando se presiona el boton ejecutamos la funcion para sumar la cantidad */
        btnSumar.addEventListener("click", () => sumarCantidad(prod.id));

        /* agregamos los tres botones al contenedor de botones */
        botones.appendChild(btnDisminuir);
        botones.appendChild(btnEliminar);
        botones.appendChild(btnSumar);

        /* agregamos la informacion y los botones a la tarjeta del producto */
        card.appendChild(info);
        card.appendChild(botones);

        /* finalmente agregamos la tarjeta completa al contenedor del carrito */
        contenedor.appendChild(card);
    });
}
