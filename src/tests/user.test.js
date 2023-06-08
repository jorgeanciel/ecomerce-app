const request = require("supertest");
const app = require("../app");

let userId;
let token;

test("POST /users", async () => {
  const user = {
    firstName: "larc",
    lastName: "enciel",
    email: "larc@gmail.com",
    password: "larc123",
    phone: 6334471,
  };
  const res = await request(app).post("/users").send(user);
  userId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
});

test("LOGIN /users/login", async () => {
  const credencial = {
    email: "larc@gmail.com",
    password: "larc123",
  };
  const res = await request(app).post("/users/login").send(credencial);
  token = res.body.token;
  expect(res.status).toBe(200);
  expect(res.body.token).toBeDefined();
});

test("GET /users", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(2);
});

test("PUT /users/:id", async () => {
  const userUpdate = {
    firstName: "ikaro",
  };
  const res = await request(app)
    .put(`/users/${userId}`)
    .send(userUpdate)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(userUpdate.firstName);
});

test("DELETE /users/:id", async () => {
  const res = await request(app)
    .delete(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
