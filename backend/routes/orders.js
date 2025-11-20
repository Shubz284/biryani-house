import express from "express";
import { body, query, param, validationResult } from "express-validator";
import Order from "../models/Order.js";

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /api/orders - Get all orders with optional filters
router.get(
  "/",
  [
    query("status")
      .optional()
      .isIn([
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ]),
    query("customer_phone").optional().isMobilePhone(),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { status, customer_phone, sort = "-order_date" } = req.query;
      const filter = {};

      if (status) filter.status = status;
      if (customer_phone) filter.customer_phone = customer_phone;

      const orders = await Order.find(filter)
        .sort(sort)
        .populate("items.menu_item_id");
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/orders/:id - Get single order
router.get(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid order ID"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "items.menu_item_id"
      );
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// POST /api/orders - Create new order
router.post(
  "/",
  [
    body("customer_name")
      .trim()
      .notEmpty()
      .withMessage("Customer name is required"),
    body("customer_phone")
      .matches(/^[0-9]{10}$/)
      .withMessage("Valid 10-digit phone number required"),
    body("delivery_address")
      .trim()
      .notEmpty()
      .withMessage("Delivery address is required"),
    body("total_amount")
      .isFloat({ min: 0 })
      .withMessage("Total amount must be a positive number"),
    body("items")
      .isArray({ min: 1 })
      .withMessage("Order must have at least one item"),
    body("items.*.menu_item_id")
      .notEmpty()
      .withMessage("Menu item ID is required"),
    body("items.*.menu_item_name")
      .trim()
      .notEmpty()
      .withMessage("Menu item name is required"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("items.*.price")
      .isFloat({ min: 0 })
      .withMessage("Price must be positive"),
    body("items.*.subtotal")
      .isFloat({ min: 0 })
      .withMessage("Subtotal must be positive"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// PATCH /api/orders/:id/status - Update order status
router.patch(
  "/:id/status",
  [
    param("id").isMongoId().withMessage("Invalid order ID"),
    body("status").isIn([
      "pending",
      "confirmed",
      "preparing",
      "out_for_delivery",
      "delivered",
      "cancelled",
    ]),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true, runValidators: true }
      );
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// DELETE /api/orders/:id - Delete order
router.delete(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid order ID"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json({ message: "Order deleted successfully", order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
