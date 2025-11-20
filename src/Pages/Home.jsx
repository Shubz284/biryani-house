import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, Star, Flame, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import MenuCard from "../Components/MenuCard";

export default function HomePage() {
  const { data: featuredItems, isLoading } = useQuery({
    queryKey: ["featured-items"],
    queryFn: () => base44.entities.MenuItem.filter({ is_featured: true }),
    initialData: [],
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1600&q=80"
            alt="Delicious biryani"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="w-6 h-6 text-orange-400" />
              <span className="text-orange-400 font-semibold tracking-wide">
                AUTHENTIC FLAVORS
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Experience the
              <span className="block text-orange-400">Magic of Biryani</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Handcrafted with aromatic spices and premium ingredients,
              delivered hot to your door.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl("Menu")}>
                <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg">
                  Order Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={createPageUrl("Menu")}>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg"
                >
                  View Menu
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: "Premium Quality",
                desc: "Finest ingredients",
              },
              {
                icon: Flame,
                title: "Authentic Spices",
                desc: "Traditional recipes",
              },
              { icon: Clock, title: "Fast Delivery", desc: "30 min or free" },
              {
                icon: Award,
                title: "Award Winning",
                desc: "Best biryani 2024",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-orange-600">Signature</span> Dishes
              </h2>
              <p className="text-xl text-gray-600">
                Handpicked favorites loved by our customers
              </p>
            </motion.div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-96 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : featuredItems.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredItems.slice(0, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Featured items coming soon!
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to={createPageUrl("Menu")}>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-6 text-lg">
                View Full Menu
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                A Legacy of <span className="text-orange-400">Flavor</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                For over 20 years, Sizzling Spices has been serving the finest
                biryanis, crafted with love and traditional recipes passed down
                through generations. Each dish is a celebration of authentic
                Indian cuisine.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                We source the finest basmati rice, premium meats, and
                hand-selected spices to create an unforgettable dining
                experience. From our kitchen to your table, we promise nothing
                but perfection.
              </p>
              <div className="flex gap-4 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">20+</div>
                  <div className="text-gray-400">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">50k+</div>
                  <div className="text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">4.9</div>
                  <div className="text-gray-400">Rating</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 md:h-full"
            >
              <img
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80"
                alt="Cooking biryani"
                className="w-full h-full object-cover rounded-xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
