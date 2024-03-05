/* Variables */
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

registrarListeners();

/* Registrar Los Listeners */
function registrarListeners() {
    // Agrega el curso al presionar el boton "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Reiniciar el carrito
        limpiarHTML(); // Limpiar el HTML
    });
};


/* Funciones */
function agregarCurso(e) {
    // Prevenir acción por defecto
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const seleccion = e.target.parentElement.parentElement;
        leerDatosCurso(seleccion);


    }
};

// Elimina un curso del carrito

function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Elimina un curso desde el botón en articulosCarrito desde el data-id

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        mostrarHTML(); // Iterar sobre carrito y mostrar su HTML
    }
}

// Lee el contenido del html al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {

    // Crear un objeto con el curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,

    };

    // Revisar si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizar la cantidad en el carrito (Iterando cada curso hasta el encontrar cual es el duplicado)
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizados
            } else {
                return curso; // Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    mostrarHTML();
};

// Muestra el carrito de compras en el HTML

function mostrarHTML() {

    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const { imagen, nombre, precio, id, cantidad } = curso;
        const row = document.createElement('TR');
        row.innerHTML = `
            <td><img src="${imagen}" loading="lazy" alt="Imagen Curso" width="100"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;

        // Agrega el html del carrito en el tbody
        contenidoCarrito.appendChild(row);
    });
}

// Función para limpiar el HTML

function limpiarHTML() {
    while (contenidoCarrito.firstChild) {
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    }
}