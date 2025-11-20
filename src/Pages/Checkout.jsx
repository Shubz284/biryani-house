import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    delivery_address: "",
    special_instructions: "",
  });

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cartData.length === 0) {
      navigate(createPageUrl("Menu"));
    }
    setCart(cartData);
  }, [navigate]);

  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      console.log("Sending order data:", orderData);
      return await base44.entities.Order.create(orderData);
    },
    onSuccess: (data) => {
      console.log("Order created successfully:", data);
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));
      navigate(createPageUrl("Orders"));
    },
    onError: (error) => {
      console.error("Order creation failed:", error);
    },
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      total_amount: getTotal(),
      order_date: new Date().toISOString(),
      status: "pending",
      items: cart.map((item) => ({
        menu_item_id: item.id || item._id, // Handle both id and _id
        menu_item_name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity,
      })),
    };

    console.log("Order data being sent:", orderData);
    console.log("Cart items:", cart);
    console.log("Mapped items:", orderData.items);

    createOrderMutation.mutate(orderData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order details</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Customer Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.customer_name}
                    onChange={(e) =>
                      handleChange("customer_name", e.target.value)
                    }
                    placeholder="John Doe"
                    className="mt-2 text-lg p-6"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-base">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.customer_phone}
                    onChange={(e) =>
                      handleChange("customer_phone", e.target.value)
                    }
                    placeholder="9322641866"
                    className="mt-2 text-lg p-6"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter 10-digit mobile number
                  </p>
                </div>
                <div>
                  <Label htmlFor="email" className="text-base">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.customer_email}
                    onChange={(e) =>
                      handleChange("customer_email", e.target.value)
                    }
                    placeholder="john@example.com"
                    className="mt-2 text-lg p-6"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-base">
                    Delivery Address *
                  </Label>
                  <Textarea
                    id="address"
                    required
                    value={formData.delivery_address}
                    onChange={(e) =>
                      handleChange("delivery_address", e.target.value)
                    }
                    placeholder="123 Main Street, Apt 4B, City, State, Pincode"
                    className="mt-2 text-lg min-h-24"
                  />
                </div>
                <div>
                  <Label htmlFor="instructions" className="text-base">
                    Special Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    value={formData.special_instructions}
                    onChange={(e) =>
                      handleChange("special_instructions", e.target.value)
                    }
                    placeholder="Any special requests or delivery instructions..."
                    className="mt-2 text-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{getSubtotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (5%)</span>
                    <span className="font-semibold">
                      ₹{Math.round(getTax())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold">
                      {getDeliveryFee() === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${getDeliveryFee()}`
                      )}
                    </span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span className="text-orange-600">
                      ₹{Math.round(getTotal())}
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 py-6 text-lg"
                >
                  {createOrderMutation.isPending ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 w-5 h-5" />
                      Place Order
                    </>
                  )}
                </Button>
                {createOrderMutation.isError && (
                  <div className="flex flex-col gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="font-semibold">Error placing order</span>
                    </div>
                    <p className="text-sm text-red-700">
                      {createOrderMutation.error?.message ||
                        "Please check your details and try again."}
                    </p>
                    {createOrderMutation.error && (
                      <details className="text-xs text-red-600">
                        <summary className="cursor-pointer">
                          Technical details
                        </summary>
                        <pre className="mt-2 p-2 bg-red-100 rounded overflow-auto">
                          {JSON.stringify(createOrderMutation.error, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  );
}
