//Variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision  = document.querySelector('#transmision')
const color = document.querySelector('#color')

const resultado = document.querySelector('#resultado')

const max = new Date().getFullYear()
const min = max - 10

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    //Función que muestra todos los autos en el HTML
    // mostrarAutos(autos)
    
    //Muestra los años en el select
    añoSelect()
})

//Event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value
   
    //Funcion que filtra los resultados por marca
    filtrarAuto()
})

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value)

    //Funcion que filtra los resultados por año
    filtrarAuto()
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value

    //Funcion que filtra los resultados por precio minimo
    filtrarAuto()
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value

    //Funcion que filtra los resultados por precio maximo
    filtrarAuto()
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas =  parseInt(e.target.value)

    //Funcion que filtra los resultados por numero de puertas
    filtrarAuto()
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value

    //Funcion que filtra los resultados por clase de transmision
    filtrarAuto()
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value

    //Funcion que filtra los resultados por color
    filtrarAuto()
})

//Funciones
function mostrarAutos(autos) {
    limpiarHTML() //Elimina el HTML previo
    
    autos.forEach( auto => {
        const {marca, modelo, year, puertas, color, precio, transmision} = auto
        const autoHTML = document.createElement('p')
        autoHTML.textContent = 
        `${marca} - 
         ${modelo} - Año: 
         ${year} - 
         ${puertas} Puertas - Color: 
         ${color} - Transmisión: 
         ${transmision} - Precio: 
         ${precio}`;

        //Insertar en el html
        resultado.appendChild(autoHTML)
    })
}

//Funcion que limpia el HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function añoSelect() {
    for (let i = max; i >= min; i--) {
        const option = document.createElement('option')
        option.value = i
        option.textContent = i
        year.appendChild(option)
    }
}

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(
        filtrarMaximo).filter(filtrarPuertas).filter(filtrarColor).filter(filtrarTransmision)
    
    if (resultado.length) {
        mostrarAutos(resultado)
    } else {
        noResultado()
    }
}

function noResultado() {
    limpiarHTML()

    const noResultado = document.createElement('div')
    noResultado.classList.add('alerta', 'error')
    noResultado.textContent = "No hay resultados. Intenta nuevamente"
    resultado.appendChild(noResultado)
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda
    
    if (marca) {
        return auto.marca === marca
    }
    return auto 
}

function filtrarYear(auto) {
    const {year} = datosBusqueda
    
    if (year) {
        return auto.year === year
    }
    return auto
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda
    
    if (minimo) {
        return auto.precio >= minimo
    }
    return auto 
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda
    
    if (maximo) {
        return auto.precio <= maximo
    }
    return auto 
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda
    
    if (puertas) {
        return auto.puertas === puertas
    }
    return auto 
}

function filtrarColor(auto) {
    const {color} = datosBusqueda
    
    if (color) {
        return auto.color === color
    }
    return auto 
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda
    
    if (transmision) {
        return auto.transmision === transmision
    }
    return auto 
}