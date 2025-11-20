import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Menu item name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["biryani", "beverages", "sweets", "sides", "specials"],
        message: "{VALUE} is not a valid category",
      },
    },
    image_url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80",
    },
    available: {
      type: Boolean,
      default: true,
    },
    spice_level: {
      type: String,
      enum: {
        values: ["none", "mild", "medium", "hot", "extra_hot"],
        message: "{VALUE} is not a valid spice level",
      },
      default: "none",
    },
    is_vegetarian: {
      type: Boolean,
      default: false,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
menuItemSchema.index({ category: 1, available: 1 });
menuItemSchema.index({ is_featured: 1 });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
