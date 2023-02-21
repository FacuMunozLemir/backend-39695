import express from "express";
import { Router } from "express";
import { ProductManager } from "../ClassProductManager.js";

const usersRouter = Router("/api/products");
usersRouter.use(express.urlencoded({ extended: true }));
const producto = new ProductManager();

usersRouter.get("/", async (req, res) => {
  let limite = req.query.limit;
  let resultado = await producto.getProducts(limite);
  res.send({ resultado });
});

usersRouter.get("/:pid", async (req, res) => {
  let id = req.params.pid;
  console.log(id);
  let resultado = await producto.getProductById(id);
  res.send({ resultado });
});

usersRouter.post("/", async (req, res) => {
  let productoNuevo = req.body;
  let resultado = await producto.insertProduct(productoNuevo);
  res.send(resultado);
});

usersRouter.put("/:pid", async (req, res) => {
  let idProducto = req.params.pid;
  let productoNuevo = req.body;
  let resultado = await producto.updateProduct(idProducto, productoNuevo);
  res.send(resultado);
});

usersRouter.delete("/:pid", async (req, res) => {
  let idProducto = req.params.pid;
  let resultado = await producto.deleteProduct(idProducto);
  res.send(resultado);
});

export default usersRouter;
