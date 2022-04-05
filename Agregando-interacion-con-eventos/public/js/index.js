/* window.onload = function () {
    document.querySelector('main').style.display = 'block'

    let $form = document.querySelector('form')
    let $input = document.querySelector('input')

    $form.addEventListener('submit', (e) => { 
        e.preventDefault()
        console.log(e.target[0].value)
    })

    $input.addEventListener('keydown', (e) =>{
        console.log('presinaste la tecla ' + e.key)
    })

}

 */
    window.onload = function(){
    //JavaScript del Index
    let container = document.querySelector('.container');
    let subtitulo = document.querySelector('.subtitulo');
    let destacado = document.querySelectorAll('p');
    let fondo = document.querySelector('body');
    let enlace = document.querySelector('a');
    
    let nombre = prompt('Ingrese su nombre');
    console.log(nombre);
    if(nombre !=''){
        subtitulo.innerHTML += nombre;
    }else{
        subtitulo.innerHTML += 'INVITADO';
    }
        
    subtitulo.style.textTransform = 'uppercase';
    let confirmar = confirm('Desea colocar un fondo de pantalla ')
    if(confirmar){
        fondo.classList.add('fondo');
        enlace.style.color = '#E51B3E';
    }
    console.log(destacado);
    for(let i = 0 ; i < destacado.length; i++){
        if(i % 2 == 0){
            destacado[i].classList.add('destacadoPar');
        }else{
            destacado[i].classList.add('destacadoImpar');
        }
    }


    let $figure = document.querySelector('.logoDH')
    let $menu = document.querySelector('#menu')

    $figure.addEventListener('click', () =>{
        $menu.classList.toggle('mostrar')
    })

    $menu.addEventListener('mouseout', () => {
        $menu.style.display = 'none'
    })


    

    container.style.display = 'block';
} 