import express from "express";
import { Router } from "express";
import { ProductManager } from "../classes/ClassProductManager.js";

const viewsRouter = Router();
viewsRouter.use(express.urlencoded({ extended: true }));
const producto = new ProductManager();

viewsRouter.get("/products", async (req, res) => {
  let limite = req.query.limit;
  let resultado = await producto.getProducts(limite);
  res.render("home", {
    titulo: "Products",
    hayProductos: resultado.length > 0,
    producto: resultado,
  });
});

export default viewsRouter;
