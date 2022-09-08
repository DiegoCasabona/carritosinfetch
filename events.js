const contenedorCaja = document.getElementsByClassName('caja-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const cajaCarrito = document.getElementsByClassName('caja-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorCaja.classList.toggle('caja-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorCaja.classList.toggle('caja-active')
})

contenedorCaja.addEventListener('click', (event) =>{
    contenedorCaja.classList.toggle('caja-active')

})
cajaCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})
