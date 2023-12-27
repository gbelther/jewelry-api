import "dotenv/config";
import express, { Router } from "express";
import { products } from "./data/products";
import { categories } from "./data/categories";

const app = express();

app.use(express.json());

const router = Router();

router.get("/categories", (request, response) => {
  response.status(200).json(categories);
});

router.get("/best-sellers", (request, response) => {
  setTimeout(() => {
    response.status(200).json(products.slice(0, 6));
  }, 1000);
});

router.get("/products", (request, response) => {
  const { categoryId } = request.query;
  const productsFiltered = products.filter(
    (product) => product.categoryId === categoryId
  );
  response.status(200).json(productsFiltered);
});

router.get("/products/:id", (request, response) => {
  const { id } = request.params;
  const productsFiltered = products.find((product) => product.id === id);
  if (!productsFiltered) {
    return response.status(204).send();
  }
  response.status(200).json(productsFiltered);
});

app.use(router);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
