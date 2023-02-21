import { readFile, writeFile } from "fs/promises";

export class CartManager {
  products;
  constructor(products) {
    this.products = products;
    return;
  }

  async insertCart(productoAgregado) {
    try {
      let arrayCart = await readFile("./public/carts.json");
      arrayCart = JSON.parse(arrayCart);
      let arrayDeProductos = [];
      productoAgregado.forEach((element) => {
        arrayDeProductos.push(element);
      });
      let agregarProducto = {
        id: arrayCart.length + 1,
        products: arrayDeProductos,
      };
      arrayCart.push(agregarProducto);
      arrayCart = JSON.stringify(arrayCart);
      try {
        await writeFile("./public/carts.json", arrayCart);
      } catch {
        console.log("No se pudo cargar el carrito");
      }
      return arrayCart;
    } catch (error) {
      console.log(error);
    }
  }
}
