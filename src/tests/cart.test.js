const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");

let token;
let cartId;

beforeAll(async () => {
  const credencial = {
    email: "testuser@gmail.com",
    password: "testuser123",
  };
  const res = await request(app).post("/users/login").send(credencial);
  token = res.body.token;
});

test("POST /carts", async () => {
  const product = await Product.create({
    title: "iphone 30",
    description: "my description",
    brand: "my brand",
    price: 20,
  });
  const cart = {
    productId: product.id,
    quantity: 3,
  };
  const res = await request(app)
    .post("/carts")
    .send(cart)
    .set("Authorization", `Bearer ${token}`);
  await product.destroy();
  cartId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("GET /carts", async () => {
  const res = await request(app)
    .get("/carts")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("PUT /carts/:id", async () => {
  const cartUpdate = {
    quantity: "5",
  };

  const res = await request(app)
    .put(`/carts/${cartId}`)
    .send(cartUpdate)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(cartUpdate.quantity);
});

test("DELETE /carts/:id", async () => {
  const res = await request(app)
    .delete(`/carts/${cartId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
