import express from "express";
import { body, query, param, validationResult } from "express-validator";
import MenuItem from "../models/MenuItem.js";

const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET /api/menu-items - Get all menu items with optional filters
router.get(
  "/",
  [
    query("category")
      .optional()
      .isIn(["biryani", "beverages", "sweets", "sides", "specials"]),
    query("is_featured").optional().isBoolean(),
    query("available").optional().isBoolean(),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { category, is_featured, available } = req.query;
      const filter = {};

      if (category) filter.category = category;
      if (is_featured !== undefined)
        filter.is_featured = is_featured === "true";
      if (available !== undefined) filter.available = available === "true";

      const menuItems = await MenuItem.find(filter).sort({ createdAt: -1 });
      res.json(menuItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// GET /api/menu-items/:id - Get single menu item
router.get(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid menu item ID"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const menuItem = await MenuItem.findById(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      res.json(menuItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// POST /api/menu-items - Create new menu item
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category").isIn([
      "biryani",
      "beverages",
      "sweets",
      "sides",
      "specials",
    ]),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const menuItem = new MenuItem(req.body);
      await menuItem.save();
      res.status(201).json(menuItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// PUT /api/menu-items/:id - Update menu item
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid menu item ID"),
    body("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category")
      .optional()
      .isIn(["biryani", "beverages", "sweets", "sides", "specials"]),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const menuItem = await MenuItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      res.json(menuItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// DELETE /api/menu-items/:id - Delete menu item
router.delete(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid menu item ID"),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      res.json({ message: "Menu item deleted successfully", menuItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
