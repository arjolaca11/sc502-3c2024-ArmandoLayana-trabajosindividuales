// Practica 2 - JavaScript del lado del cliente
// Validacion y simulacion de envio del formulario de reservacion

// ---------- Selectores ----------
const form = document.getElementById("form-reservacion");
const campoNombre = document.getElementById("nombre");
const campoContacto = document.getElementById("contacto-cliente");
const campoFecha = document.getElementById("fecha");
const campoPersonas = document.getElementById("personas");
const campoComentarios = document.getElementById("comentarios");
const divConfirmacion = document.querySelector("#confirmacion");

// ---------- Funciones auxiliares ----------

// Muestra un mensaje de error debajo del campo y lo marca en rojo
function mostrarError(campo, mensaje) {
  document.getElementById("error-" + campo.id).textContent = mensaje;
  campo.classList.add("invalido");
}

// Quita el mensaje de error de un campo
function limpiarError(campo) {
  document.getElementById("error-" + campo.id).textContent = "";
  campo.classList.remove("invalido");
}

// ---------- Validaciones (cada una devuelve true o false) ----------

function validarNombre() {
  const valor = campoNombre.value.trim();
  if (valor === "") {
    mostrarError(campoNombre, "El nombre es obligatorio.");
    return false;
  }
  if (valor.length < 3) {
    mostrarError(campoNombre, "El nombre debe tener al menos 3 caracteres.");
    return false;
  }
  limpiarError(campoNombre);
  return true;
}

function validarContacto() {
  const valor = campoContacto.value.trim();
  if (valor === "") {
    mostrarError(campoContacto, "El contacto es obligatorio.");
    return false;
  }

  // Correo basico: tiene @ (no al inicio), un punto despues del @ y sin espacios
  const posArroba = valor.indexOf("@");
  const posPunto = valor.lastIndexOf(".");
  const esCorreo = posArroba > 0 && posPunto > posArroba + 1 &&
                   posPunto < valor.length - 1 && !valor.includes(" ");

  // Telefono basico: 8 digitos (se permite un guion, ej. 8888-8888)
  const soloDigitos = valor.replace("-", "");
  const esTelefono = soloDigitos.length === 8 && !isNaN(soloDigitos);

  if (!esCorreo && !esTelefono) {
    mostrarError(campoContacto, "Ingrese un correo valido o un telefono de 8 digitos.");
    return false;
  }
  limpiarError(campoContacto);
  return true;
}

function validarFecha() {
  if (campoFecha.value === "") {
    mostrarError(campoFecha, "La fecha es obligatoria.");
    return false;
  }
  // Se compara la fecha elegida con la de hoy (a las 00:00)
  const elegida = new Date(campoFecha.value + "T00:00:00");
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (elegida < hoy) {
    mostrarError(campoFecha, "La fecha no puede ser anterior a hoy.");
    return false;
  }
  limpiarError(campoFecha);
  return true;
}

function validarPersonas() {
  if (campoPersonas.value === "") {
    mostrarError(campoPersonas, "El numero de personas es obligatorio.");
    return false;
  }
  const numero = Number(campoPersonas.value);
  if (numero <= 0 || numero % 1 !== 0) {
    mostrarError(campoPersonas, "Debe ser un numero entero mayor a cero.");
    return false;
  }
  limpiarError(campoPersonas);
  return true;
}

function validarComentarios() {
  const valor = campoComentarios.value.trim();
  if (valor === "") {
    mostrarError(campoComentarios, "Los comentarios son obligatorios.");
    return false;
  }
  if (valor.length < 10) {
    mostrarError(campoComentarios, "Escriba al menos 10 caracteres.");
    return false;
  }
  limpiarError(campoComentarios);
  return true;
}

// ---------- Confirmacion ----------

function mostrarConfirmacion(datos) {
  divConfirmacion.className = "confirmacion exito";
  divConfirmacion.innerHTML =
    "<h3>Reservacion enviada correctamente</h3>" +
    "<ul>" +
    "<li><b>Nombre:</b> <span id='c-nombre'></span></li>" +
    "<li><b>Contacto:</b> <span id='c-contacto'></span></li>" +
    "<li><b>Fecha:</b> <span id='c-fecha'></span></li>" +
    "<li><b>Personas:</b> <span id='c-personas'></span></li>" +
    "<li><b>Comentarios:</b> <span id='c-comentarios'></span></li>" +
    "</ul>";

  // Los datos del usuario se colocan con textContent (mas seguro que innerHTML)
  document.getElementById("c-nombre").textContent = datos.nombre;
  document.getElementById("c-contacto").textContent = datos.contacto;
  document.getElementById("c-fecha").textContent = datos.fecha;
  document.getElementById("c-personas").textContent = datos.personas;
  document.getElementById("c-comentarios").textContent = datos.comentarios;
}

function ocultarConfirmacion() {
  divConfirmacion.innerHTML = "";
  divConfirmacion.className = "confirmacion";
}

// ---------- Eventos ----------

// Envio del formulario
form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // evita que la pagina se recargue

  // Se llaman todas las validaciones para mostrar todos los errores a la vez
  const nombreOk = validarNombre();
  const contactoOk = validarContacto();
  const fechaOk = validarFecha();
  const personasOk = validarPersonas();
  const comentariosOk = validarComentarios();

  if (!nombreOk || !contactoOk || !fechaOk || !personasOk || !comentariosOk) {
    ocultarConfirmacion();
    return;
  }

  // Simulacion de envio: los datos solo se muestran en pantalla
  const datos = {
    nombre: campoNombre.value.trim(),
    contacto: campoContacto.value.trim(),
    fecha: campoFecha.value,
    personas: campoPersonas.value,
    comentarios: campoComentarios.value.trim()
  };
  mostrarConfirmacion(datos);
  form.reset();
});

// Validacion al salir de cada campo
campoNombre.addEventListener("blur", validarNombre);
campoContacto.addEventListener("blur", validarContacto);
campoFecha.addEventListener("blur", validarFecha);
campoPersonas.addEventListener("blur", validarPersonas);
campoComentarios.addEventListener("blur", validarComentarios);
