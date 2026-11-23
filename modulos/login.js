const formLogin = document.getElementById("form-login");
const inputNombre = document.getElementById("input-nombre");

function esNombreValido(nombre) {
    const limpio = String(nombre || "").trim();
    if (limpio.length < 3) return false;
    if (/\d/.test(limpio)) return false;
    return true;
}

if (formLogin) {
    formLogin.addEventListener("submit", function (session) {
        session.preventDefault();

        let nombre = "";
        if (inputNombre) {
            nombre = inputNombre.value;
        }

        if (!esNombreValido(nombre)) {
            if (inputNombre) {
                inputNombre.value = "";
                inputNombre.focus();
            }
            return;
        }

        localStorage.setItem("nombreCliente", nombre.trim());
        window.location.href = "index.html";
    });
}
