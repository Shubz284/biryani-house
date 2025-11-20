import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  menu_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  menu_item_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  subtotal: {
    type: Number,
    required: true,
    min: [0, "Subtotal cannot be negative"],
  },
});

const orderSchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    customer_phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9]{10}$/, "Please provide a valid 10-digit phone number"],
    },
    customer_email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    delivery_address: {
      type: String,
      required: [true, "Delivery address is required"],
      trim: true,
      maxlength: [500, "Address cannot exceed 500 characters"],
    },
    special_instructions: {
      type: String,
      trim: true,
      maxlength: [500, "Instructions cannot exceed 500 characters"],
    },
    total_amount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },
    order_date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: {
        values: [
          "pending",
          "confirmed",
          "preparing",
          "out_for_delivery",
          "delivered",
          "cancelled",
        ],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
    items: {
      type: [orderItemSchema],
      required: [true, "Order items are required"],
      validate: {
        validator: function (items) {
          return items && items.length > 0;
        },
        message: "Order must have at least one item",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
orderSchema.index({ customer_phone: 1, order_date: -1 });
orderSchema.index({ status: 1, order_date: -1 });
orderSchema.index({ order_date: -1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;
