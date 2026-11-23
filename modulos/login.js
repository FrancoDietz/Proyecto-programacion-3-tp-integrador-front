const loginBox = document.getElementById("login");
const formLogin = loginBox ? loginBox.querySelector("form") : null;
const inputNombre = loginBox ? loginBox.querySelector("input") : null;
const buttonsOverlay = document.querySelector(".buttons-overlay");

export let nombreCliente = localStorage.getItem("nombreCliente") || "";

export function obtenerNombreCliente() {
    return localStorage.getItem("nombreCliente") || "";
}

export function esNombreValido(valor) {
    const limpio = valor.trim();
    if (limpio.length < 3) return false;
    if (/\d/.test(limpio)) return false;
    return true;
}

export function verificarAcceso() {
    const actual = obtenerNombreCliente();
    const valido = esNombreValido(actual);

    if (loginBox) {
        loginBox.classList.toggle("hidden", valido);
    }
    if (buttonsOverlay) {
        buttonsOverlay.classList.toggle("hidden", !valido);
    }
    if (!valido && inputNombre) {
        inputNombre.focus();
    }
}

if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();
        const valor = inputNombre ? inputNombre.value : "";

        if (!esNombreValido(valor)) {
            if (inputNombre) {
                inputNombre.value = "";
                inputNombre.focus();
            }
            return;
        }

        nombreCliente = valor.trim();
        localStorage.setItem("nombreCliente", nombreCliente);
        verificarAcceso();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", verificarAcceso);
} else {
    verificarAcceso();
}