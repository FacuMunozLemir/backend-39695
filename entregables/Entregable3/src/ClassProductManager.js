//Manejo de Archivos
import { readFile } from "fs/promises";

// const fs = require("fs");

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

  async getProducts(limite) {
    let nuevoArreglo = [];
    try {
      let arrayProductos = await readFile("./src/products.json", "utf-8");
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
      let arrayProductos = await readFile("./src/products.json", "utf-8");
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
}
