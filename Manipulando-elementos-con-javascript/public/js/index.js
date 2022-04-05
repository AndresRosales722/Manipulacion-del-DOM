function qs (element) {
    return document.querySelector(element)
}


let $main = qs('main')
let $h2 = qs('.subtitulo')
let $a = qs('a')
let $p = document.querySelectorAll('p')
let $body = qs('body')



let userName = prompt('Ingrese su nombre') ||  'Invitado'
$h2.innerText += ` ${userName.trim()}`

$h2.style.textTransform = 'uppercase'
$a.style.color = '#e51b3e'
$main.style.display = "block"

let background = confirm('¿Desea colocar un fondo de pantalla?')

background && $body.classList.add('fondo')

$p.forEach((element, index) => {
    if((index + 1) % 2 == 0){
        element.classList.add('destacadoPar')
    }else{
        element.classList.add('destacadoImpar')
    }
})