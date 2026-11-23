const formLogin = document.getElementById("form-login");
const inputNombre = document.getElementById("input-nombre");

/* funcion para validar el nombre ingresadp en el login*/
function esNombreValido(nombre) {
    /* limpiamos el nombre ingresado con aterioridad*/ 
    const limpio = String(nombre || "").trim();
/*comprobamos que el nombre ingresado tenga mas de 3 letras*/ 
    if (limpio.length < 3) return false;
/* comprobamos que no tenga ninugn numero */
    for (let i = 0; i < limpio.length; i++) {
        if (limpio[i] >= "0" && limpio[i] <= "9") {
            return false;
        }
    }

    return true;
}

/* si yas se valido primero prevenimos el default*/
if (formLogin) {
    formLogin.addEventListener("submit", function (session) {
        session.preventDefault();
/*guardamos el nombre ingresadp en una variable*/
        let nombre = "";
        if (inputNombre) {
            nombre = inputNombre.value;
        }
/*si el nombre no pasa la validacion simplemente se borra para que se ingrese otro valido*/ 
        if (!esNombreValido(nombre)) {
            if (inputNombre) {
                inputNombre.value = "";
                inputNombre.focus();
            }
            return;
        }
/*guardamos en localstorage el nombre y redirigimos a la pagina de index */ 
        localStorage.setItem("nombreCliente", nombre.trim());
        window.location.href = "index.html";
    });
}
