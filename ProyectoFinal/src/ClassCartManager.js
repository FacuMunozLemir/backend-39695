import { readFile, writeFile } from "fs/promises";

export class CartManager {
  products;
  constructor(products) {
    this.products = products;
    return;
  }

  async insertCart(productoAgregado) {
    try {
      let arrayCart = await readFile("./ProyectoFinal/public/carts.json");
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
        await writeFile("./ProyectoFinal/public/carts.json", arrayCart);
      } catch {
        console.log("No se pudo cargar el carrito");
      }
      return arrayCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    let arrayProductosEnCart = [];
    let arrayAuxiliar = [];
    try {
      let arrayCarts = await readFile("./ProyectoFinal/public/carts.json", "UTF-8");
      arrayCarts = JSON.parse(arrayCarts);
      let cartEncontrado = arrayCarts.find((el) => el.id == id);
      if (cartEncontrado != undefined) {
        arrayAuxiliar = cartEncontrado.products;
        arrayAuxiliar.forEach((element) => {
          arrayProductosEnCart.push(element);
        });
        return arrayProductosEnCart;
      } else {
        return "El id ingresado no corresponde a ningún cart";
      }
    } catch (error) {
      return error;
    }
  }

  async addProductById(cartId, prodId) {
    let aux = [];
    let aux2 = [];
    let indexOfCart;

    try {
      let arrayCarts = await readFile("./ProyectoFinal/public/carts.json", "UTF-8");
      arrayCarts = JSON.parse(arrayCarts);
      let cartEncontrado = arrayCarts.find((el) => el.id == cartId);
      if (cartEncontrado != undefined) {
        indexOfCart = arrayCarts.indexOf(cartEncontrado);
        //En aux ahora voy a tener mi array de productos dentro del cart
        aux = cartEncontrado.products;
        //Y ahora lo voy a cargar con un elemento que coincida con el id buscado
        aux = aux.find((el) => el.id == prodId);
        if (aux == undefined) {
          //Carga un producto si no se encontraba en el array
          let objetoNuevo = { id: parseInt(prodId), quantity: 1 };
          aux2 = cartEncontrado.products;
          aux2.push(objetoNuevo);
          cartEncontrado.products = aux2;
          arrayCarts[indexOfCart] = cartEncontrado;
          try {
            arrayCarts = JSON.stringify(arrayCarts);
            await writeFile("./ProyectoFinal/public/carts.json", arrayCarts);
            return arrayCarts;
          } catch (error) {
            return error;
          }
        } else {
          //Aumenta la cantidad de un producto exsistente en el array
          aux2 = cartEncontrado.products;
          aux2 = aux2.indexOf(aux);
          aux.quantity = aux.quantity + 1;
          cartEncontrado.products[aux2] = aux;
          arrayCarts[(indexOfCart = cartEncontrado)];
          try {
            arrayCarts = JSON.stringify(arrayCarts);
            await writeFile("./ProyectoFinal/public/carts.json", arrayCarts);
            return arrayCarts;
          } catch (error) {
            return error;
          }
        }
      } else {
        return "El id ingresado no corresponde a ningún cart";
      }
    } catch (error) {
      return error;
    }
  }
}
