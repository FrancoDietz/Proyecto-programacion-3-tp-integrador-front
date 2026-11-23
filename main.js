import { agregarProductoAlCarrito } from "./modulos/carrito.js";

const urlBase = "http://127.0.0.1:3000";
const nombreEmpresa = "Cachopos xAVI";

const nombreGuardado = (localStorage.getItem("nombreCliente") || "").trim();
if (nombreGuardado.length < 3 || /\d/.test(nombreGuardado)) {
    window.location.href = "login.html";
}

const mainMenu = document.getElementById("main-menu");

export async function abrirSeccion(categoria) {
    const catalogSection = document.getElementById("catalog-section");
    const catalogTitle = document.getElementById("catalog-title");
    const productsGrid = document.getElementById("products-grid");

    if (mainMenu) mainMenu.classList.add("hidden");
    if (catalogSection) catalogSection.classList.remove("hidden");

    if (catalogTitle) {
        if (categoria === "food") {
            catalogTitle.innerText = "Comidas";
        } else {
            catalogTitle.innerText = "Bebidas";
        }
    }

    if (productsGrid) productsGrid.innerHTML = "Cargando productos...";

    try {
        const response = await fetch(`${urlBase}/api/products`);

        if (!response.ok) {
            throw new Error("Error al consultar los productos");
        }

        const data = await response.json();
        let productosDB = [];
        if (Array.isArray(data)) {
            productosDB = data;
        } else if (data.payload) {
            productosDB = data.payload;
        }

        const productosFiltrados = productosDB.filter(prod => {
            return prod.category === categoria && (prod.active === 1 || prod.active === true);
        });

        if (productsGrid) productsGrid.innerHTML = "";

        if (productosFiltrados.length === 0) {
            if (productsGrid) {
                productsGrid.innerHTML = "No hay productos disponibles en esta categoría.";
            }
            return;
        }

        productosFiltrados.forEach(prod => {
            const card = document.createElement("div");
            card.classList.add("prod-card");

            card.innerHTML = `
                <img src="${prod.image}" alt="${prod.name}">
                <h3>${prod.name}</h3>
                <span class="price">$${prod.price}</span>
            `;

            const boton = document.createElement("button");
            boton.classList.add("btn-add-cart");
            boton.innerText = "Comprar";

            boton.addEventListener("click", function () {
                let idProducto = prod.id;
                if (!idProducto) {
                    idProducto = prod._id;
                }

                agregarProductoAlCarrito(
                    idProducto,
                    prod.name,
                    Number(prod.price),
                    prod.image
                );
            });

            card.appendChild(boton);
            if (productsGrid) productsGrid.appendChild(card);
        });

    } catch (error) {
        console.error("Error al conectar con el backend:", error);
        if (productsGrid) {
            productsGrid.innerHTML = "Error al conectar con el servidor backend. Asegúrate de que Node.js esté corriendo.";
        }
    }
}

export function volverAlMenu() {
    const catalogSection = document.getElementById("catalog-section");
    if (catalogSection) catalogSection.classList.add("hidden");
    if (mainMenu) mainMenu.classList.remove("hidden");
}

export function abrirRedes() {
    alert(`Redes de ${nombreEmpresa}`);
}

export function abrirCupon() {
    alert("Ingresá tu cupón en el pedido");
}

window.abrirSeccion = abrirSeccion;
window.volverAlMenu = volverAlMenu;
window.abrirRedes = abrirRedes;
window.abrirCupon = abrirCupon;