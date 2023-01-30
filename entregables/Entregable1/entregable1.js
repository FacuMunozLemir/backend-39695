//Clases con ECMAScript y ECMAScript avanzado
let products = [];

class ProductManager {
  title;
  description;
  price;
  thumbnail;
  code;
  stock;

  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    return;
  }

  addProduct() {
    let codigo = products.find((product) => product.code == this.code);
    if (
      codigo == "" ||
      this.title == "" ||
      this.description == "" ||
      this.price == "" ||
      this.thumbnail == "" ||
      this.stock == ""
    ) {
      console.log(
        "Todos los campos deben estar cargado para poder cargar un producto"
      );
    } else {
      if (codigo == undefined) {
        products.push({
          id: products.length + 1,
          title: this.title,
          description: this.description,
          price: this.price,
          thumbnail: this.thumbnail,
          code: this.code,
          stock: this.stock,
        });
        console.log(
          "El producto con código: " +
            this.code +
            " se ha cargado satisfactoriamente"
        );
      } else {
        console.log(
          "El código de producto que desea ingresar ya se encuentra cargado"
        );
      }
    }
  }

  getProducts() {
    console.log("Los productos cargados son: ");
    console.log(products);
    return products;
  }

  getProductById(iden) {
    let id = products.find((product) => product.id == iden);
    if (id == undefined) {
      console.log("El producto que está buscando no se encuentra cargado");
    } else {
      console.log("Hemos encontrado el producto que estaba buscando: ");
      console.log(id);
      return id;
    }
  }
}

//Ejecutamos el sistema principal
main();

function main() {
  products = [];
  // Primero hacemos un get product que me muestre mi array vacío.
  const obtenerProducto = new ProductManager();
  obtenerProducto.getProducts();

  //Cargando producto 1
  const p1 = new ProductManager(
    (title = "Producto prueba"),
    (description = "Este es un producto prueba 1"),
    (price = 200),
    (thumbnail = "Sin imagen"),
    (code = "abc123"),
    (stock = 25)
  );
  p1.addProduct();

  //Mostramos mi primer producto cargado
  obtenerProducto.getProducts();

  //Cargando producto 2 que no se debería cargar y avisar que el producto con dicho código ya se encuentra cargado
  const p2 = new ProductManager(
    (title = "Producto prueba"),
    (description = "Este es un producto prueba 2"),
    (price = 200),
    (thumbnail = "Sin imagen"),
    (code = "abc123"),
    (stock = 25)
  );
  p2.addProduct();

  // Ahora vamos a buscar un producto por ID. Si existe devuelve el producto, sino muestra un mensaje de error
  const pId1 = new ProductManager().getProductById(2);
}
