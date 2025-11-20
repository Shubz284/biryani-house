import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MenuCard from "../components/MenuCard";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [spiceFilter, setSpiceFilter] = useState("all");

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ["menu-items"],
    queryFn: () => base44.entities.MenuItem.list(),
    initialData: [],
  });

  // Debug: Log menu items to console
  React.useEffect(() => {
    console.log("Menu Items:", menuItems);
    if (menuItems && menuItems.length > 0) {
      console.log("First item:", menuItems[0]);
      console.log("First item image_url:", menuItems[0].image_url);
    }
  }, [menuItems]);

  const categories = [
    { value: "all", label: "All Items", icon: "🍽️" },
    { value: "biryani", label: "Biryani", icon: "🍛" },
    { value: "beverages", label: "Beverages", icon: "🥤" },
    { value: "sweets", label: "Sweets", icon: "🍰" },
    { value: "sides", label: "Sides", icon: "🥗" },
    { value: "specials", label: "Specials", icon: "⭐" },
  ];

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      activeCategory === "all" || item.category === activeCategory;
    const spiceMatch =
      spiceFilter === "all" || item.spice_level === spiceFilter;
    return categoryMatch && spiceMatch && item.available;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-orange-600">Delicious</span> Menu
          </h1>
          <p className="text-xl text-gray-600">
            Explore our wide range of authentic dishes
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-8">
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto bg-white shadow-md p-2 rounded-xl">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white px-6 py-3 text-base"
                >
                  <span className="mr-2">{cat.icon}</span>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Spice Filter */}
        {activeCategory === "biryani" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 flex items-center gap-4 flex-wrap"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-700">Spice Level:</span>
            </div>
            <div className="flex gap-2">
              {["all", "mild", "medium", "hot", "extra_hot"].map((level) => (
                <Button
                  key={level}
                  variant={spiceFilter === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSpiceFilter(level)}
                  className={
                    spiceFilter === level
                      ? "bg-orange-600 hover:bg-orange-700"
                      : ""
                  }
                >
                  {level === "all" ? "All" : level.replace("_", " ")}
                  {level !== "all" && level !== "mild" && " 🌶️"}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Menu Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 bg-gray-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
