//Variables 
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []


//Eventos
eventListeners()

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet)

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []

        crearHTML()
    })
}

//Funciones
function agregarTweet(e) {
    e.preventDefault()
    
    //Obtener el contenido del mensaje
    const tweet = document.querySelector('#tweet').value

    if (tweet === '') {
        mostrarError('El tweet no puede estar vacio...')
         return
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    
    //Añadir al arreglo de teets
    tweets = [...tweets, tweetObj]
    
    //Crear el HTML
    crearHTML()

    //Reiniciar el formulario
    formulario.reset()
}

function mostrarError(error) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    //Inserta el mensaje de error
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)

    //Elimina el mensaje de error despues del tiempo establecido
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

//Funcion que muestra el listado de los tweets
function crearHTML() {
    limpiarHTML()

    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            //Crear el HTML
            const li = document.createElement('li')
            li.innerText = tweet.tweet
            listaTweets.appendChild(li)
        })
    }

    sincronizarStorage()
}

//Funcion que agrega los tweets actuales al LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//Funcion para limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}