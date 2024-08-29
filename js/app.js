const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let cantidad = 0
let articulosCarrito = []

cargarEventListener();
function cargarEventListener () {
    listaCursos.addEventListener('click', agregarCurso);

    carrito.addEventListener("click", eliminarCurso);
    //Vaciar carrito
    vaciarCarrito.addEventListener('click',VaciarC);

    document.addEventListener('DOMContentLoaded', cargarStorage());

    
}

function VaciarC() {
    articulosCarrito = [];
    limpiarHTML();
}


function agregarCurso (e) {
    e.preventDefault();
    if  (e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
        
    }
}

//eliminar datos del curso
function eliminarCurso (e) {
    if (e.target.classList.contains("borrar-curso")){
        const cursoID = e.target.getAttribute("data-id");
       articulosCarrito = articulosCarrito.filter(carrito => carrito.id !== cursoID);
       carritoHTMl();
  
    };
}


// leer el contenido del target al que le diste click

function leerDatosCurso(curso){

    //crear elemento segun su seleccion
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad: cantidad + 1,  
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map (curso => {
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            };
        })
    } else {
        //agregar al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
        console.log(contenedorCarrito);
    }

    carritoHTMl();
}

// generar html 

function carritoHTMl () {
    //limpiar HTMl
    limpiarHTML();


    //Crear HTML
    articulosCarrito.forEach (curso => {
        const { titulo, precio, cantidad, id} = curso
        const row = document.createElement('tr');
        row.innerHTML =  `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
        ${titulo}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
        `;

        contenedorCarrito.appendChild(row);

        sincronizarStorage();


    })
} 

//limpiar HTML de forma lenta
 function limpiarHTML (){
//     contenedorCarrito.innerHTML = ''

while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
}
 }

 function sincronizarStorage (){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito))
    
 }

 function cargarStorage (){
    articulosCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log(articulosCarrito)
    carritoHTMl();
 }