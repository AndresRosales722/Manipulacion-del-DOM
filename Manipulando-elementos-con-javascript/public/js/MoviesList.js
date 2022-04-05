function qs (element) {
    return document.querySelector(element)
}

let $body = qs('body')
let $h1 = qs('.moviesListTitulo')

let fondo = confirm('Desea el modo oscuro')

if (fondo == true) {
    $body.classList.add('fondoMoviesList')
}

$h1.innerText = "LISTADO DE PELÍCULAS"