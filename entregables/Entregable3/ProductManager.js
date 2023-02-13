//Manejo de Archivos
import { readFile, writeFile } from "fs/promises";
// const fs = require("fs");

const fsWrite = writeFile;
const fsRead = readFile;

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

  async addProduct() {
    let products = [];

    try {
      let arrayProductos = await readFile(this.path, "utf-8");
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
            await writeFile(this.path, arrayProductos);
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
      let arrayProductos = await readFile("./products.txt", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      console.log("Los productos cargados son: ");
      console.log(arrayProductos);
      return arrayProductos;
    } catch {
      let arrayVacio = [];
      arrayVacio = JSON.stringify(arrayVacio);
      try {
        await writeFile("./products.txt", arrayVacio);
        console.log(await readFile("./products.txt", "utf-8"));
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getProductById(iden) {
    try {
      let arrayProductos = await readFile("./products.txt", "utf-8");
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
      let arrayProductos = await readFile("./products.txt", "utf-8");
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
          await writeFile("./products.txt", arrayProductos);
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
      let arrayProductos = await readFile("./products.txt", "utf-8");
      arrayProductos = JSON.parse(arrayProductos);
      let deleteProduct = arrayProductos.find((product) => product.id == id);
      if (deleteProduct != undefined) {
        arrayProductos.pop(deleteProduct);
      } else {
        console.log("El producto que desea eliminar no se encuentra cargado");
      }

      try {
        arrayProductos = JSON.stringify(arrayProductos);
        await writeFile("./products.txt", arrayProductos);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
