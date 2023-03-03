import express from "express";
import { Router } from "express";
import { CartManager } from "../classes/ClassCartManager.js";
// import { ProductManager } from "../ClassProductManager.js";

const cartRouter = Router("/api/carts");
cartRouter.use(express.urlencoded({ extended: true }));
const cart = new CartManager();
// const product = new ProductManager();

cartRouter.post("/", async (req, res) => {
  let carritoNuevo = req.body;
  let resultado = await cart.insertCart(carritoNuevo);
  res.send(resultado);
});

cartRouter.get("/:cid", async (req, res) => {
  let idCarrito = req.params.cid;
  let resultado = await cart.getProductById(idCarrito);
  res.send(resultado);
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  let idCarrito = req.params.cid;
  let idProducto = req.params.pid;
  let resultado = await cart.addProductById(idCarrito, idProducto);
  res.send(resultado);
});

export default cartRouter;
