const request = require("supertest");
const app = require("../app");
const Category = require("../models/Category");
const ProductImg = require("../models/ProductImg");
require("../models");

let token;
let productId;

beforeAll(async () => {
  const credentials = {
    email: "testuser@gmail.com",
    password: "testuser123",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /product", async () => {
  const category = await Category.create({ name: "smarth" });

  const product = {
    title: "Galaxy S",
    description:
      "El Galaxy cuenta con una pantalla de alta calidad que ofrece imágenes nítidas y vibrantes. Dependiendo del modelo, puede tener una pantalla Super AMOLED o Dynamic AMOLED, que brinda colores vivos y un alto contraste.",
    brand: "Samsung",
    price: 200,
    categoryId: category.id,
  };
  const res = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  await category.destroy();
  productId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /products", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /products/:id", async () => {
  const productUpdate = {
    title: "Galaxy update",
  };

  const res = await request(app)
    .put(`/products/${productId}`)
    .send(productUpdate)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(productUpdate.title);
});

test("POST /products/:id/images", async () => {
  const image = await ProductImg.create({
    url: "http://falseurl.com",
    publicId: "false Id",
  });

  const res = await request(app)
    .post(`/products/${productId}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`);
  await image.destroy();
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("DELETE /products/:id", async () => {
  const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
