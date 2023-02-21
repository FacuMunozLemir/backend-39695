import express from "express";
import { Router } from "express";
import { CartManager } from "../ClassCartManager.js";
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

export default cartRouter;
