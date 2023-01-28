//Clases con ECMAScript y ECMAScript avanzado
let products = [];

class ProductManager {
  id;
  title;
  description;
  price;
  thumbnail;
  code;
  stock;

  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    return;
  }

  addProduct() {
    console.log(this.id);
    console.log(this.title);

    products.push([this.id, this.title]);
    console.log(products);
  }
}

function main() {
  id = products.length + 1;
  let title = "Sistema de ventas";
  const p = new ProductManager(id, title);
  p.addProduct();
}

main();
