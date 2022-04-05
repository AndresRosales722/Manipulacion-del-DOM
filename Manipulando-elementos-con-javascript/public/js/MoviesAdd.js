function qs (element) {
    return document.querySelector(element)
}

let $article = qs('#article')
let $h1 = qs('.moviesAddTitulo')
let $section = qs('#formulario')

$h1.innerText = "LISTADO DE PELICULAS"
$article.classList.add("fondoTransparente")
$section.classList.add("fondoCRUD")