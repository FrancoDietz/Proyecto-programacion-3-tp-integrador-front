import { agregarProductoAlCarrito } from "./modulos/carrito.js";

const urlBase = "http://127.0.0.1:3000";
const nombreEmpresa = "Cachopos xAVI";

/* recuperamos el nombre del cliente guardado en localstorage y eliminamos espacios sobrantes */
const nombreGuardado = (localStorage.getItem("nombreCliente") || "").trim();

/* comprobamos que el nombre tenga al menos 3 caracteres y que no contenga numeros */
if (nombreGuardado.length < 3 || /\d/.test(nombreGuardado)) {

    /* si el nombre no es valido redirigimos al usuario nuevamente al login */
    window.location.href = "login.html";
}

/* buscamos el contenedor del menu principal */
const mainMenu = document.getElementById("main-menu");


/* funcion para abrir una categoria y mostrar sus productos */
export async function abrirSeccion(categoria) {

    /* buscamos los elementos del HTML donde vamos a mostrar el catalogo */
    const catalogSection = document.getElementById("catalog-section");
    const catalogTitle = document.getElementById("catalog-title");
    const productsGrid = document.getElementById("products-grid");

    /* ocultamos el menu principal y mostramos la seccion del catalogo */
    if (mainMenu) mainMenu.classList.add("hidden");
    if (catalogSection) catalogSection.classList.remove("hidden");

    /* cambiamos el titulo dependiendo de la categoria seleccionada */
    if (catalogTitle) {
        if (categoria === "food") {
            catalogTitle.innerText = "Comidas";
        } else {
            catalogTitle.innerText = "Bebidas";
        }
    }

    /* mostramos un mensaje mientras se cargan los productos */
    if (productsGrid) productsGrid.innerHTML = "Cargando productos...";

    try {

        /* consultamos al backend para obtener todos los productos */
        const response = await fetch(`${urlBase}/api/products`);

        /* comprobamos si la respuesta del servidor fue correcta */
        if (!response.ok) {
            throw new Error("Error al consultar los productos");
        }

        /* convertimos la respuesta del servidor a formato JSON */
        const data = await response.json();

        /* creamos un array vacio para guardar los productos obtenidos de la base de datos */
        let productosDB = [];

        /* comprobamos si la respuesta ya es un array */
        if (Array.isArray(data)) {
            productosDB = data;

        /* si los productos vienen dentro de la propiedad payload los guardamos desde ahi */
        } else if (data.payload) {
            productosDB = data.payload;
        }

        /* filtramos los productos para mostrar solamente los de la categoria seleccionada
        y que se encuentren activos */
        const productosFiltrados = productosDB.filter(prod => {
            return prod.category === categoria && (prod.active === 1 || prod.active === true);
        });

        /* limpiamos el contenedor antes de mostrar los productos filtrados */
        if (productsGrid) productsGrid.innerHTML = "";

        /* comprobamos si existen productos disponibles en la categoria seleccionada */
        if (productosFiltrados.length === 0) {
            if (productsGrid) {
                productsGrid.innerHTML = "No hay productos disponibles en esta categoría.";
            }
            return;
        }

        /* recorremos los productos filtrados para crear una tarjeta para cada uno */
        productosFiltrados.forEach(prod => {

            /* creamos la tarjeta principal del producto */
            const card = document.createElement("div");
            card.classList.add("prod-card");

            /* mostramos la imagen, el nombre y el precio del producto dentro de la tarjeta */
            card.innerHTML = `
                <img src="${prod.image}" alt="${prod.name}">
                <h3>${prod.name}</h3>
                <span class="precio">$${prod.price}</span>
            `;

            /* creamos el boton para agregar el producto al carrito */
            const boton = document.createElement("button");
            boton.classList.add("btn-add-cart");
            boton.innerText = "Comprar";

            /* cuando el usuario presiona comprar ejecutamos la funcion para agregar el producto */
            boton.addEventListener("click", function () {

                /* obtenemos el id del producto */
                let idProducto = prod.id;

                /* si no encontramos el id buscamos el identificador alternativo _id */
                if (!idProducto) {
                    idProducto = prod._id;
                }

                /* enviamos los datos del producto a la funcion del carrito */
                agregarProductoAlCarrito(
                    idProducto,
                    prod.name,
                    Number(prod.price),
                    prod.image
                );
            });

            /* agregamos el boton a la tarjeta del producto */
            card.appendChild(boton);

            /* agregamos la tarjeta completa al contenedor del catalogo */
            if (productsGrid) productsGrid.appendChild(card);
        });

    } catch (error) {

        /* mostramos el error en la consola si ocurre un problema al consultar el backend */
        console.error("Error al conectar con el backend:", error);

        /* mostramos un mensaje en pantalla para informar que no se pudo conectar con el servidor */
        if (productsGrid) {
            productsGrid.innerHTML = "Error al conectar con el servidor backend. Asegúrate de que Node.js esté corriendo.";
        }
    }
}


/* funcion para volver desde el catalogo al menu principal */
export function volverAlMenu() {

    /* buscamos la seccion del catalogo */
    const catalogSection = document.getElementById("catalog-section");

    /* ocultamos el catalogo y volvemos a mostrar el menu principal */
    if (catalogSection) catalogSection.classList.add("hidden");
    if (mainMenu) mainMenu.classList.remove("hidden");
}


/* funcion para mostrar las redes sociales */
export function abrirRedes() {
    alert(`Redes de ${nombreEmpresa}`);
}


/* funcion para mostrar el aviso del cupon */
export function abrirCupon() {
    alert("Ingresá tu cupón en el pedido");
}


/* hacemos que las funciones esten disponibles desde el HTML mediante window */
window.abrirSeccion = abrirSeccion;
window.volverAlMenu = volverAlMenu;
window.abrirRedes = abrirRedes;
window.abrirCupon = abrirCupon;