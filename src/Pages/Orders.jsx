import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function OrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => base44.entities.Order.list("-created_date"),
    initialData: [],
  });

  const statusConfig = {
    pending: {
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
      label: "Pending",
    },
    confirmed: {
      icon: CheckCircle,
      color: "bg-blue-100 text-blue-800",
      label: "Confirmed",
    },
    preparing: {
      icon: Package,
      color: "bg-purple-100 text-purple-800",
      label: "Preparing",
    },
    out_for_delivery: {
      icon: Truck,
      color: "bg-orange-100 text-orange-800",
      label: "Out for Delivery",
    },
    delivered: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
      label: "Delivered",
    },
    cancelled: {
      icon: XCircle,
      color: "bg-red-100 text-red-800",
      label: "Cancelled",
    },
  };

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Your Orders</h1>
          <p className="text-gray-600">Track your order history and status</p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Package className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-700">
              No orders yet
            </h2>
            <p className="text-gray-500 mb-8">
              Start ordering some delicious biryani!
            </p>
            <Link to={createPageUrl("Menu")}>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-8 py-6 text-lg">
                Browse Menu
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              const orderId = order._id || order.id;
              const orderDate = order.order_date || order.created_date;

              return (
                <motion.div
                  key={orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                          <CardTitle className="text-xl mb-2">
                            Order #{orderId.toString().slice(-8).toUpperCase()}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {format(
                              new Date(orderDate),
                              "MMMM d, yyyy 'at' h:mm a"
                            )}
                          </p>
                        </div>
                        <Badge
                          className={`${status.color} flex items-center gap-2 px-4 py-2`}
                        >
                          <StatusIcon className="w-4 h-4" />
                          {status.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-700">
                            Delivery Details
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p>
                              <span className="font-medium">Name:</span>{" "}
                              {order.customer_name}
                            </p>
                            <p>
                              <span className="font-medium">Phone:</span>{" "}
                              {order.customer_phone}
                            </p>
                            <p>
                              <span className="font-medium">Address:</span>{" "}
                              {order.delivery_address}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 text-gray-700">
                            Order Items
                          </h4>
                          <div className="space-y-1 text-sm">
                            {order.items?.map((item, idx) => (
                              <p key={idx}>
                                {item.menu_item_name} x{item.quantity} - ₹
                                {item.subtotal}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                      {order.special_instructions && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm">
                            <span className="font-semibold">
                              Special Instructions:
                            </span>{" "}
                            {order.special_instructions}
                          </p>
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-lg font-semibold text-gray-700">
                          Total Amount
                        </span>
                        <span className="text-2xl font-bold text-orange-600">
                          ₹{Math.round(order.total_amount)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
