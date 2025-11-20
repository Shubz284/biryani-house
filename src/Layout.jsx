import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  ShoppingCart,
  Menu as MenuIcon,
  X,
  Phone,
  MapPin,
  Clock,
  Mail,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);

    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCount = updatedCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      setCartCount(updatedCount);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, [location]);

  const navItems = [
    { name: "Home", path: createPageUrl("Home") },
    { name: "Menu", path: createPageUrl("Menu") },
    { name: "Orders", path: createPageUrl("Orders") },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <style>{`
        :root {
          --primary: #FF6B35;
          --secondary: #8B0000;
          --accent: #FFA500;
          --cream: #FFF8DC;
        }
      `}</style>

      {/* Top Info Bar */}
      <div className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3" />
              <span>9322641866</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Clock className="w-3 h-3" />
              <span>Open Daily: 11 AM - 11 PM</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            <span>
              Near bouddha vihar library, Ambedakar society, Jaysingpur 416 101
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link
              to={createPageUrl("Home")}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">🔥</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-700 bg-clip-text text-transparent">
                  Sizzling Spices
                </h1>
                <p className="text-xs text-gray-600 -mt-1">Biryani House</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-lg font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-gray-700 hover:text-orange-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to={createPageUrl("Cart")}>
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white relative">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 border-2 border-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <Link to={createPageUrl("Cart")} className="relative">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-3 px-4 text-lg font-medium ${
                    location.pathname === item.path
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-280px)]">{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">
                About Us
              </h3>
              <p className="text-gray-300">
                Sizzling Spices Biryani House brings you authentic, aromatic
                biryanis made with the finest ingredients and traditional
                recipes passed down through generations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">
                Contact
              </h3>
              <div className="space-y-2 text-gray-300">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> 9322641866
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> sizzlingspices@gmail.com
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                  <span>
                    Near bouddha vihar library, Ambedakar society, Jaysingpur
                    416 101
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Open Daily: 11 AM - 11 PM
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-orange-400">Hours</h3>
              <div className="space-y-1 text-gray-300">
                <p>Monday - Friday: 11 AM - 11 PM</p>
                <p>Saturday - Sunday: 10 AM - 12 AM</p>
                <p className="mt-4 text-orange-400">
                  Free delivery on orders over ₹500!
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Sizzling Spices Biryani House. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
