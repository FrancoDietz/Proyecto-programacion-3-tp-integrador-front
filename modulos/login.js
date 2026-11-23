const formLogin = document.getElementById("form-login");
const inputNombre = document.getElementById("input-nombre");

function esNombreValido(valor) {
    const limpio = String(valor || "").trim();
    if (limpio.length < 3) return false;
    if (/\d/.test(limpio)) return false;
    return true;
}

if (formLogin) {
    formLogin.addEventListener("submit", function (e) {
        e.preventDefault();

        let valor = "";
        if (inputNombre) {
            valor = inputNombre.value;
        }

        if (!esNombreValido(valor)) {
            if (inputNombre) {
                inputNombre.value = "";
                inputNombre.focus();
            }
            return;
        }

        localStorage.setItem("nombreCliente", valor.trim());
        window.location.href = "index.html";
    });
}

function abrirRedes() {
    alert("Redes de Cachopos xAVI");
}

function abrirCupon() {
    alert("Ingresá tu cupón en el pedido");
}