document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function() { // tambien podemos usar document en vez de window
        if(sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
        }else{
            header.classList.remove('fixed');
        }
    });
}
function crearGaleria() {
    const CANTIDAD_IMAGENES = 16;//constante para que no sea un numero definido por asi
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG')
        imagen.src = `../src/img/gallery/full/${i}.jpg`
        imagen.alt = `Imagen ${i}`;

        //Event Handler // responde a un llamado en este caso un click

        imagen.onclick = function() {
            mostrarImagen(i);
            // abrirModal(i);
        }
        
        galeria.appendChild(imagen);
    }
};
function mostrarImagen(i){
    const imagen = document.createElement('IMG')
    imagen.src = `../src/img/gallery/full/${i}.jpg`
    imagen.alt = `Imagen ${i}`;

    //Generar Modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    //Boton cerrar modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;
    
    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    //Agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);

    console.log(modal)
}
function cerrarModal(){
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal?.remove()
        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden');
    }, 500);
}
function resaltarEnlace() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if(window.scrollY >= sectionTop - sectionHeight / 3){
                actual = section.id;
            }

            navLinks.forEach(link => {
                link.classList.remove('activo')
                if(link.getAttribute('href') === `#${actual}`){
                    link.classList.add('activo')
                }
            })
        })
    });
}
function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: "smooth"});
        })
    })
}