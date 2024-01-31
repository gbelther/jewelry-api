import "dotenv/config";
import express, { Router } from "express";
import { products } from "./data/products";
import { categories } from "./data/categories";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  setTimeout(next, 2000);
});

const router = Router();

router.get("/categories", (request, response) => {
  response.status(200).json(categories);
});

router.get("/best-sellers", (request, response) => {
  setTimeout(() => {
    response.status(200).json(products.slice(0, 6));
  }, 1000);
});

const sortByRelevance = (
  prev: (typeof products)[number],
  next: (typeof products)[number]
) => {
  return -1;
};

const sortByPriceAsc = (
  prev: (typeof products)[number],
  next: (typeof products)[number]
) => {
  return prev.price - next.price;
};

const sortByPriceDesc = (
  prev: (typeof products)[number],
  next: (typeof products)[number]
) => {
  return next.price - prev.price;
};

const sortByAlphabeticalAsc = (
  prev: (typeof products)[number],
  next: (typeof products)[number]
) => {
  if (prev.name < next.name) {
    return -1;
  }
  if (prev.name > next.name) {
    return 1;
  }
  return 0;
};

const sortByAlphabeticalDesc = (
  prev: (typeof products)[number],
  next: (typeof products)[number]
) => {
  if (prev.name > next.name) {
    return -1;
  }
  if (prev.name < next.name) {
    return 1;
  }
  return 0;
};

const sortStrategy = {
  relevance: sortByRelevance,
  "price-asc": sortByPriceAsc,
  "price-desc": sortByPriceDesc,
  "alphabetical-asc": sortByAlphabeticalAsc,
  "alphabetical-desc": sortByAlphabeticalDesc,
};

router.get("/products", (request, response) => {
  const { categoryId, categoryKey, sort } = request.query;
  const productsFiltered = products
    .filter((product) =>
      categoryId ? product.categoryId === categoryId : true
    )
    .filter((product) => {
      if (!categoryKey) return true;
      const category = categories.find(
        (category) => category.key === categoryKey
      );
      return product.categoryId === category.id;
    })
    .sort(sortStrategy[sort as keyof typeof sortStrategy]);
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
