import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.05;
  };

  const getDeliveryFee = () => {
    return getSubtotal() >= 500 ? 0 : 40;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getDeliveryFee();
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-600">Review your order before checkout</p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Add some delicious items to get started!
            </p>
            <Link to={createPageUrl("Menu")}>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-8 py-6 text-lg">
                Browse Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img
                            src={
                              item.image_url ||
                              "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&q=80"
                            }
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold">{item.name}</h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <div className="text-xl font-bold text-orange-600">
                                ₹{item.price * item.quantity}
                              </div>
                              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="h-8 w-8"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-8 text-center font-bold">
                                  {item.quantity}
                                </span>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="h-8 w-8"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">GST (5%)</span>
                    <span className="font-semibold">
                      ₹{Math.round(getTax())}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {getDeliveryFee() === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${getDeliveryFee()}`
                      )}
                    </span>
                  </div>
                  {getSubtotal() < 500 && (
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-sm text-orange-700">
                        Add ₹{500 - getSubtotal()} more for free delivery!
                      </p>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">
                        ₹{Math.round(getTotal())}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate(createPageUrl("Checkout"))}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 py-6 text-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
