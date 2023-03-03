const socket = io();

document.querySelector("#btnNuevoProd")?.addEventListener("click", (ev) => {
  const prod = {
    nombre: document.querySelector("#inputNombre").value,
    precio: document.querySelector("#inputPrecio").value,
  };
  socket.emit("nuevoProducto", prod);
});

socket.on("actualizar", (productos) => {
  const productsDiv = document.querySelector("#products");
  productsDiv.innerHTML = armarListaProductos(productos);
});

function armarListaProductos(productos) {
  return JSON.stringify(productos, null, 2);
}

socket.emit("mandameProductos");
