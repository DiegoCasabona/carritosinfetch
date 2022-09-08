
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const botonCompra = document.getElementById('comprar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    Swal.fire({
        title: 'Está seguro?',
        text: "El carrito quedará vacío!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar!'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0
            actualizarCarrito()
            Swal.fire(
                'Eliminado!',
                'El carrito quedó vacío',
                'success'
            )
        }
    })
})

botonCompra.addEventListener('click', () => {
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Gracias por tu compra!!',
        showConfirmButton: false,
        timer: 1500
    })
    carrito.length = 0
    actualizarCarrito()
})

//Insertar HTML
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Tamaño: ${producto.size}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>

    `
    contenedorProductos.appendChild(div)

    //insertar HTML EN EL DOM:
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})


//Agregar productos al carrito
const agregarAlCarrito = (prodId) => {

    //Aumentar cant y no repetir
    const existe = carrito.some(prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
            }
        })
    } else { //si no está, agrega
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }

    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)

    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}
