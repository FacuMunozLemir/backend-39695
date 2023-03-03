import express from "express";
import { Router } from "express";
import { ProductManager } from "../classes/ClassProductManager.js";

const productsRouter = Router("/api/products");
productsRouter.use(express.urlencoded({ extended: true }));
const producto = new ProductManager();

productsRouter.get("/", async (req, res) => {
  let limite = req.query.limit;
  let resultado = await producto.getProducts(limite);
  res.render("home", {
    titulo: "Products",
    hayProductos: resultado.length > 0,
    producto: resultado,
  });
});

productsRouter.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  console.log(id);
  let resultado = await producto.getProductById(id);
  res.send({ resultado });
});

productsRouter.post("/", async (req, res) => {
  let productoNuevo = req.body;
  let resultado = await producto.insertProduct(productoNuevo);
  res.send(resultado);
});

productsRouter.put("/:pid", async (req, res) => {
  let idProducto = req.params.pid;
  let productoNuevo = req.body;
  let resultado = await producto.updateProduct(idProducto, productoNuevo);
  res.send(resultado);
});

productsRouter.delete("/:pid", async (req, res) => {
  let idProducto = req.params.pid;
  let resultado = await producto.deleteProduct(idProducto);
  res.send(resultado);
});

export default productsRouter;
