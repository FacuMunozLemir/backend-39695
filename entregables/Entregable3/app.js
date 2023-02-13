//importamos la clase
import { ProductManager } from "./ProductManager.js";
const PATH = "./products.txt";
//Ejecutamos el sistema principal
main();
async function main() {
  // Primero hacemos un get product que me muestre mi array vacío.
  const obtenerProducto = new ProductManager();
  await obtenerProducto.getProducts();

  //Ahora agregamos un producto
  const p1 = new ProductManager(
    "./products.txt",
    "Producto prueba",
    "Este es un producto prueba 1",
    200,
    "Sin imagen",
    "abc123",
    25
  );
  await p1.addProduct();

  //Mostramos el primer producto cargado
  await obtenerProducto.getProducts();

  //Cargando producto 2
  const p2 = new ProductManager(
    "./products.txt",
    "Producto prueba",
    "Este es un producto prueba 2",
    200,
    "Sin imagen",
    "abc1234",
    25
  );
  await p2.addProduct();

  // Ahora vamos a buscar un producto por ID. Si existe devuelve el producto, sino muestra un mensaje de error
  const pId1 = new ProductManager();
  await pId1.getProductById(2);

  //Modificamos el elemento con id 1
  const modificarProducto = await new ProductManager().updateProduct(
    1,
    "title",
    "Nuevo titulo"
  );

  //Eliminamos el producto con el ID y mostramos array
  const deletee = await new ProductManager().deleteProduct(3);
}
