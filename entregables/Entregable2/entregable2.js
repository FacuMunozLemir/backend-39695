//Manejo de Archivos
// const { readFile, writeFile } = require("fs");
const fs = require("fs");
const PATH = "./products.txt";

class ProductManager {
  path;
  title;
  description;
  price;
  thumbnail;
  code;
  stock;

  constructor(path, title, description, price, thumbnail, code, stock) {
    this.path = path;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    return;
  }

  async addProduct() {
    let products = [];

    try {
      let arrayProductos = await fs.promises.readFile(this.path, "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      if (!arrayProductos.some((product) => product.code == this.code)) {
        if (
          this.codigo != "" &&
          this.title != "" &&
          this.description != "" &&
          this.price != "" &&
          this.thumbnail != "" &&
          this.stock != ""
        ) {
          arrayProductos.push({
            path: this.path,
            id: arrayProductos.length + 1,
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
          });
          arrayProductos = JSON.stringify(arrayProductos);

          try {
            await fs.promises.writeFile(this.path, arrayProductos);
            console.log(
              "El producto con código: " +
                this.code +
                " se ha cargado satisfactoriamente"
            );
          } catch {
            console.log("No se pudo cargar el producto xd");
          }
        } else {
          console.log(
            "Todos los campos deben estar cargados para poder cargar un producto"
          );
        }
      } else {
        console.log("Este codigo ya fue ingresado");
      }
    } catch {
      if (
        this.codigo == "" ||
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
        products.push({
          path: this.path,
          id: products.length + 1,
          title: this.title,
          description: this.description,
          price: this.price,
          thumbnail: this.thumbnail,
          code: this.code,
          stock: this.stock,
        });

        products = JSON.stringify(products);

        try {
          await fs.promises.writeFile(this.path, products);
          console.log(
            "El producto con código: " +
              this.code +
              " se ha cargado satisfactoriamente"
          );
        } catch {
          console.log("No se pudo cargar el producto xd");
        }
      }
    }
  }

  async getProducts() {
    try {
      let arrayProductos = await fs.promises.readFile(
        "./products.txt",
        "utf-8"
      );
      arrayProductos = JSON.parse(arrayProductos);
      console.log("Los productos cargados son: ");
      console.log(arrayProductos);
      return arrayProductos;
    } catch {
      let arrayVacio = [];
      arrayVacio = JSON.stringify(arrayVacio);
      try {
        await fs.promises.writeFile("./products.txt", arrayVacio);
        console.log(await fs.promises.readFile("./products.txt", "utf-8"));
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getProductById(iden) {
    try {
      let arrayProductos = await fs.promises.readFile(
        "./products.txt",
        "utf-8"
      );
      arrayProductos = JSON.parse(arrayProductos);
      let id = arrayProductos.find((product) => product.id == iden);
      if (id == undefined) {
        console.log("El producto que está buscando no se encuentra cargado");
      } else {
        console.log("Hemos encontrado el producto que estaba buscando: ");
        console.log(id);
        return id;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, parametro, nuevoValor) {
    try {
      let arrayProductos = await fs.promises.readFile(
        "./products.txt",
        "utf-8"
      );
      arrayProductos = JSON.parse(arrayProductos);
      let updateProduct = arrayProductos.find((product) => product.id == id);
      let indice = arrayProductos.indexOf(updateProduct);
      if (updateProduct != undefined) {
        switch (parametro) {
          case "title":
            updateProduct.title = nuevoValor;
            break;
          case "description":
            updateProduct.description = nuevoValor;
            break;
          case "price":
            updateProduct.price = nuevoValor;
            break;
          case "thumbnail":
            updateProduct.thumbnail = nuevoValor;
            break;
          case "code":
            updateProduct.code = nuevoValor;
            break;
          case "stock":
            updateProduct.stock = nuevoValor;
            break;
        }
        arrayProductos[indice] = updateProduct;
        arrayProductos = JSON.stringify(arrayProductos);
        try {
          await fs.promises.writeFile("./products.txt", arrayProductos);
        } catch {
          console.log("No se pudo cargar el producto xd");
        }
      } else {
        console.log("El producto que desea modificar no se encuentra cargado");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let arrayProductos = await fs.promises.readFile(
        "./products.txt",
        "utf-8"
      );
      arrayProductos = JSON.parse(arrayProductos);
      let deleteProduct = arrayProductos.find((product) => product.id == id);
      if (deleteProduct != undefined) {
        arrayProductos.pop(deleteProduct);
      } else {
        console.log("El producto que desea eliminar no se encuentra cargado");
      }

      try {
        arrayProductos = JSON.stringify(arrayProductos);
        await fs.promises.writeFile("./products.txt", arrayProductos);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//Ejecutamos el sistema principal
async function main() {
  // Primero hacemos un get product que me muestre mi array vacío.
  const obtenerProducto = new ProductManager();
  await obtenerProducto.getProducts();

  //Ahora agregamos un producto
  const p1 = new ProductManager(
    (path = PATH),
    (title = "Producto prueba"),
    (description = "Este es un producto prueba 1"),
    (price = 200),
    (thumbnail = "Sin imagen"),
    (code = "abc123"),
    (stock = 25)
  );
  await p1.addProduct();

  //Mostramos el primer producto cargado
  await obtenerProducto.getProducts();

  //Cargando producto 2
  const p2 = new ProductManager(
    (path = PATH),
    (title = "Producto prueba 2"),
    (description = "Este es un producto prueba 2"),
    (price = 200),
    (thumbnail = "Sin imagen"),
    (code = "abc1234"),
    (stock = 25)
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

main();
