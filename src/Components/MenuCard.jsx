import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, ShoppingCart, Flame, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function MenuCard({ item }) {
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [imageError, setImageError] = useState(false);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemId = item._id || item.id; // MongoDB uses _id

    console.log("Adding to cart - Full item:", item);
    console.log("Item ID (_id):", item._id);
    console.log("Item ID (id):", item.id);
    console.log("Using itemId:", itemId);

    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === itemId
    );

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: itemId, // Store MongoDB _id as id
        name: item.name,
        price: item.price,
        image_url: item.image_url,
        quantity: quantity,
      });
    }

    console.log("Cart after adding:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    setShowQuantity(false);
    setQuantity(1);
  };

  const spiceEmoji = {
    mild: "🌶️",
    medium: "🌶️🌶️",
    hot: "🌶️🌶️🌶️",
    extra_hot: "🌶️🌶️🌶️🔥",
  };

  return (
    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <div className="relative h-56 overflow-hidden bg-orange-50">
        <img
          src={
            imageError
              ? "/placeholder-biryani.svg"
              : item.image_url ||
                "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80"
          }
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {item.is_vegetarian && (
            <Badge className="bg-green-500 text-white">
              <Leaf className="w-3 h-3 mr-1" />
              Veg
            </Badge>
          )}
          {item.is_featured && (
            <Badge className="bg-yellow-500 text-gray-900">⭐ Featured</Badge>
          )}
        </div>
        {item.spice_level && item.spice_level !== "none" && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-white/90">
              {spiceEmoji[item.spice_level]}
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{item.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-orange-600">
            ₹{item.price}
          </div>

          {!showQuantity ? (
            <Button
              onClick={() => setShowQuantity(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-8 w-8"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button
                onClick={addToCart}
                size="icon"
                className="bg-green-600 hover:bg-green-700"
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
