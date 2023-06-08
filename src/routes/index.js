const express = require("express");
const userRouter = require("./user.route");
const categoryRouter = require("./category.route");
const productRouter = require("./product.route");
const productImgRouter = require("./productImg.route");
const cartRouter = require("./cart.route");
const purchaseRouter = require("./purchase.route");
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/products_images", productImgRouter);
router.use("/cart", cartRouter);
router.use("/purchases", purchaseRouter);

module.exports = router;
