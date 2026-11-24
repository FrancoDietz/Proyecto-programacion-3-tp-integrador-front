const formLogin = document.getElementById("form-login");
const inputNombre = document.getElementById("input-nombre");

/* funcion para validar el nombre ingresado en el login */
function esNombreValido(nombre) {
    /* limpiamos el nombre ingresado con anterioridad */
    const limpio = String(nombre || "").trim();

    /* comprobamos que el nombre ingresado tenga al menos 3 letras */
    if (limpio.length < 3) return false;

    /* comprobamos que no tenga ningun numero */
    for (let i = 0; i < limpio.length; i++) {
        if (limpio[i] >= "0" && limpio[i] <= "9") {
            return false;
        }
    }

    return true;
}

/* si ya se valido primero prevenimos el default */
if (formLogin) {
    formLogin.addEventListener("submit", function (session) {
        session.preventDefault();

        /* guardamos el nombre ingresado en una variable */
        let nombre = "";
        if (inputNombre) {
            nombre = inputNombre.value;
        }

        /* si el nombre no pasa la validacion simplemente se borra para que se ingrese otro valido */
        if (!esNombreValido(nombre)) {
            if (inputNombre) {
                inputNombre.value = "";
                inputNombre.focus();
            }
            return;
        }

        /* guardamos en sessionStorage el nombre y redirigimos a la pagina de index */
        sessionStorage.setItem("nombreCliente", nombre.trim());
        window.location.href = "index.html";
    });
}