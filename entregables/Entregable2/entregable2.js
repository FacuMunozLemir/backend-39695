//Manejo de Archivos
const {
  readFileSync, //lee un archivo
  writeFileSync, //escribe o sobreescribe un archivo
} = require("fs");


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
    let products = [];
    let error;

    try {
      let arrayProductos = readFileSync("./products.txt", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      let codigo = arrayProductos.find((product) => product.code == this.code);

      if (codigo == undefined) {
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
            arrayProductos.push({
              path: "./products.txt",
              id: arrayProductos.length + 1,
              title: this.title,
              description: this.description,
              price: this.price,
              thumbnail: this.thumbnail,
              code: this.code,
              stock: this.stock,
            });
            let path = arrayProductos[0].path;
            arrayProductos = JSON.stringify(arrayProductos);
  
            try {
              writeFileSync(path, arrayProductos);
              console.log(
                "El producto con código: " +
                  this.code +
                  " se ha cargado satisfactoriamente"
              );
            } catch {
              console.log("No se pudo cargar el producto xd");
            }
            }
          }else{
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
            path: "./products.txt",
            id: products.length + 1,
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
          });
          let path = products[0].path;
          products = JSON.stringify(products);

          try {
            writeFileSync(path, products);
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

    


    // if (
    //   this.codigo == "" ||
    //   this.title == "" ||
    //   this.description == "" ||
    //   this.price == "" ||
    //   this.thumbnail == "" ||
    //   this.stock == ""
    // ) {
    //   console.log(
    //     "Todos los campos deben estar cargado para poder cargar un producto"
    //   );
    // } else {
    //   if (codigo == undefined) {

    //     if(arrayProductos == []){
    //       products.push({
    //         path: "./products.txt",
    //         id: products.length + 1,
    //         title: this.title,
    //         description: this.description,
    //         price: this.price,
    //         thumbnail: this.thumbnail,
    //         code: this.code,
    //         stock: this.stock,
    //       });
    //       let path = products[0].path;
    //       products = JSON.stringify(products);

    //       try {
    //         writeFileSync(path, products);
    //         console.log(
    //           "El producto con código: " +
    //             this.code +
    //             " se ha cargado satisfactoriamente"
    //         );
    //       } catch {
    //         console.log("No se pudo cargar el producto xd");
    //       }

    //     }

        






    //   } else {
    //     console.log(
    //       "El código de producto que desea ingresar ya se encuentra cargado"
    //     );
    //   }
    // }
  }

  getProducts() {
    try {
      let arrayProductos = readFileSync("./products.txt", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      console.log("Los productos cargados son: ");
      console.log(arrayProductos);
      return arrayProductos;
    }catch{
      console.log("NO se pudo leer el archivo");
    }
}

  getProductById(iden) {
    try {
      let arrayProductos = readFileSync("./products.txt", "utf-8");
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

  updateProduct(id, parametro, nuevoValor){
    try {
      let arrayProductos = readFileSync("./products.txt", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      let updateProduct = arrayProductos.find((product) => product.id == id);
      let indice = arrayProductos.indexOf(updateProduct);
      if(updateProduct != undefined){
        if(parametro == "title"){
          updateProduct.title = nuevoValor      
        }
        if(parametro == "description"){
          updateProduct.description = nuevoValor;      
        }
        if(parametro == "price"){
          updateProduct.price = nuevoValor;      
        }
        if(parametro == "thumbnail"){
          updateProduct.thumbnail = nuevoValor;      
        }
        if(parametro == "code"){
          updateProduct.code = nuevoValor;      
        }
        if(parametro == "stock"){
          updateProduct.stock = nuevoValor;     
        }
        arrayProductos[indice] = updateProduct;
        arrayProductos = JSON.stringify(arrayProductos);
        try {
          writeFileSync("./products.txt", arrayProductos);
        } catch {
          console.log("No se pudo cargar el producto xd");
        }
      }else{
        console.log("El producto no se encuentra cargado")
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteProduct(id){

    try {
      let arrayProductos = readFileSync("./products.txt", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      let deleteProduct = arrayProductos.find((product) => product.id == id);
      arrayProductos.pop(deleteProduct);
      try {
        arrayProductos = JSON.stringify(arrayProductos);
        writeFileSync("./products.txt", arrayProductos);
      } catch (error) {
        console.log(error);
      }

    } catch (error) {
      console.log(error);
    }
  }


}

//Ejecutamos el sistema principal
main();

function main() {
  // products = [];
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

  // //Cargando producto 2 que no se debería cargar y avisar que el producto con dicho código ya se encuentra cargado
  // const p2 = new ProductManager(
  //   (title = "Producto prueba"),
  //   (description = "Este es un producto prueba 2"),
  //   (price = 200),
  //   (thumbnail = "Sin imagen"),
  //   (code = "abc123"),
  //   (stock = 25)
  // );
  // p2.addProduct();

  // // Ahora vamos a buscar un producto por ID. Si existe devuelve el producto, sino muestra un mensaje de error
  const pId1 = new ProductManager().getProductById(1);

  // //Modificamos el elemento con id 1
  const modificarProducto = new ProductManager().updateProduct(1, "title", "Nuevo titulo");

  // //Eliminamos el producto con el ID y mostramos array
  const deletee = new ProductManager().deleteProduct(1);
}
