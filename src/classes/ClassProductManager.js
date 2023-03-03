//Manejo de Archivos
import { readFile, writeFile } from "fs/promises";

export class ProductManager {
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

  async insertProduct(prod) {
    try {
      let arrayProductos = await this.getProducts();
      prod.forEach((element) => {
        let encontrarCodigo = arrayProductos.find(
          (product) => product.code == element.code
        );
        if (encontrarCodigo == undefined) {
          if (
            element.code != "" &&
            element.title != "" &&
            element.description != "" &&
            element.price != "" &&
            element.status != "" &&
            element.category != "" &&
            element.stock != ""
          ) {
            arrayProductos.push({
              id: arrayProductos.length + 1,
              title: element.title,
              description: element.description,
              code: element.code,
              price: element.price,
              status: element.status,
              stock: element.stock,
              category: element.category,
              thumbnail: element.thumbnail,
            });
          } else {
            console.log("Todos los campos deben estar completos");
          }
        } else {
          console.log("El código que ingresó ya se encuentra cargado");
        }
      });

      arrayProductos = JSON.stringify(arrayProductos);
      try {
        await writeFile("./public/products.json", arrayProductos);
      } catch {
        console.log("No se pudo cargar el producto");
      }
      return arrayProductos;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts(limite) {
    let nuevoArreglo = [];
    try {
      let arrayProductos = await readFile("./public/products.json", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      if (limite == " " || limite == null) {
        return arrayProductos;
      } else {
        for (let i = 0; i < limite; i++) {
          nuevoArreglo.push(arrayProductos[i]);
        }
        return nuevoArreglo;
      }
    } catch (error) {
      return error;
    }
  }

  async getProductById(iden) {
    try {
      let arrayProductos = await readFile("./public/products.json", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      let id = arrayProductos.find((product) => product.id == iden);
      if (id == undefined) {
        return "El producto que está buscando no se encuentra cargado";
      } else {
        return id;
      }
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, prod) {
    try {
      let arrayProductos = await readFile("./public/products.json", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      let updateProduct = arrayProductos.find((product) => product.id == id);
      let indice = arrayProductos.indexOf(updateProduct);
      if (updateProduct != undefined) {
        arrayProductos[indice].title = prod[0].title;
        arrayProductos[indice].description = prod[0].description;
        arrayProductos[indice].code = prod[0].code;
        arrayProductos[indice].price = prod[0].price;
        arrayProductos[indice].status = prod[0].status;
        arrayProductos[indice].stock = prod[0].stock;
        arrayProductos[indice].category = prod[0].category;
        arrayProductos[indice].thumbnail = prod[0].thumbnail;

        arrayProductos = JSON.stringify(arrayProductos);
        try {
          await writeFile("./public/products.json", arrayProductos);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("El id ingresado no se encuentra cargado");
      }
      return arrayProductos;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let arrayProductos = await readFile("./public/products.json", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      let deleteProduct = arrayProductos.find((product) => product.id == id);
      if (deleteProduct != undefined) {
        arrayProductos.pop(deleteProduct);
      } else {
        console.log("El producto que desea eliminar no se encuentra cargado");
      }

      try {
        arrayProductos = JSON.stringify(arrayProductos);
        await writeFile("./public/products.json", arrayProductos);
        return arrayProductos;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
