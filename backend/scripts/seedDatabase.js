import dotenv from "dotenv";
import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";

dotenv.config();

const sampleMenuItems = [
  // BIRYANI (Prices start from ₹120)
  {
    name: "Hyderabadi Dum Biryani",
    description:
      "Aromatic basmati rice layered with tender marinated chicken, slow-cooked with saffron and exotic spices",
    price: 169.99,
    category: "biryani",
    image_url:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80",
    spice_level: "medium",
    is_vegetarian: false,
    is_featured: true,
    available: true,
  },
  {
    name: "Paneer Tikka Biryani",
    description:
      "Grilled cottage cheese cubes with aromatic rice and tangy spices",
    price: 159.99,
    category: "biryani",
    image_url:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80",
    spice_level: "mild",
    is_vegetarian: true,
    is_featured: true,
    available: true,
  },
  {
    name: "Vegetable Biryani",
    description:
      "Garden-fresh vegetables with aromatic basmati rice, delicately spiced to perfection",
    price: 139.99,
    category: "biryani",
    image_url:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80",
    spice_level: "mild",
    is_vegetarian: true,
    is_featured: true,
    available: true,
  },
  {
    name: "Egg Biryani",
    description:
      "Boiled eggs cooked with fragrant basmati rice and traditional spices",
    price: 129.99,
    category: "biryani",
    image_url:
      "https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&q=80",
    spice_level: "medium",
    is_vegetarian: false,
    is_featured: false,
    available: true,
  },
  {
    name: "Chicken Biryani",
    description: "Classic chicken biryani with tender pieces and aromatic rice",
    price: 149.99,
    category: "biryani",
    image_url:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400&q=80",
    spice_level: "medium",
    is_vegetarian: false,
    is_featured: false,
    available: true,
  },
  {
    name: "Mutton Biryani",
    description:
      "Succulent mutton pieces slow-cooked with premium basmati rice",
    price: 199.99,
    category: "biryani",
    image_url:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
    spice_level: "hot",
    is_vegetarian: false,
    is_featured: false,
    available: true,
  },
  {
    name: "Prawns Biryani",
    description: "Fresh prawns marinated and cooked with aromatic spices",
    price: 229.99,
    category: "biryani",
    image_url:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80",
    spice_level: "medium",
    is_vegetarian: false,
    is_featured: false,
    available: true,
  },

  // BEVERAGES - Shakes, Coffee, Soft Drinks
  {
    name: "Mango Lassi",
    description: "Creamy yogurt drink blended with sweet mangoes",
    price: 49.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Masala Chai",
    description: "Traditional spiced tea with aromatic spices and milk",
    price: 39.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1597318130721-5f8f6c200c62?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Fresh Lime Soda",
    description: "Refreshing lime juice with soda and a hint of mint",
    price: 34.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee with milk and ice cream",
    price: 69.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Chocolate Shake",
    description: "Thick chocolate milkshake with ice cream",
    price: 79.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Strawberry Shake",
    description: "Fresh strawberry milkshake with cream",
    price: 79.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Coca Cola",
    description: "Chilled Coca Cola",
    price: 29.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Sprite",
    description: "Chilled lemon-lime soda",
    price: 29.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1625740550276-9a058bd54c7d?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Thumbs Up",
    description: "Strong cola drink",
    price: 29.99,
    category: "beverages",
    image_url:
      "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },

  // SWEETS
  {
    name: "Rasmalai",
    description:
      "Soft cheese patties in sweetened, thickened milk with cardamom",
    price: 69.99,
    category: "sweets",
    image_url:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Kheer",
    description: "Creamy rice pudding with cardamom, saffron, and nuts",
    price: 49.99,
    category: "sweets",
    image_url:
      "https://images.unsplash.com/photo-1606313564559-46d81e0b2cc7?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Gulab Jamun",
    description:
      "Golden fried milk dumplings soaked in rose-flavored sugar syrup",
    price: 59.99,
    category: "sweets",
    image_url:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },

  // SIDES
  {
    name: "Raita",
    description: "Cool yogurt with cucumber and spices",
    price: 39.99,
    category: "sides",
    image_url:
      "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Papad",
    description: "Crispy fried Indian crackers",
    price: 19.99,
    category: "sides",
    image_url:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
    spice_level: "none",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
  {
    name: "Onion Salad",
    description: "Fresh onion rings with lemon and green chilies",
    price: 29.99,
    category: "sides",
    image_url:
      "https://images.unsplash.com/photo-1607532941433-304659e8198a?w=400&q=80",
    spice_level: "mild",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },

  // SPECIALS - Shareable items only
  {
    name: "Family Combo Pack",
    description:
      "Complete meal for 4 with biryani, sides, beverages, and dessert",
    price: 899.99,
    category: "specials",
    image_url:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    spice_level: "medium",
    is_vegetarian: false,
    is_featured: true,
    available: true,
  },
  {
    name: "Special Feast Biryani",
    description:
      "Chef's special biryani with chicken, mutton, and boiled eggs - serves 2",
    price: 499.99,
    category: "specials",
    image_url:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80",
    spice_level: "hot",
    is_vegetarian: false,
    is_featured: true,
    available: true,
  },
  {
    name: "Party Pack Biryani",
    description:
      "Large serving of mixed biryani for 6-8 people with raita and salad",
    price: 1299.99,
    category: "specials",
    image_url:
      "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=400&q=80",
    spice_level: "medium",
    is_vegetarian: false,
    is_featured: true,
    available: true,
  },
  {
    name: "Vegetarian Feast",
    description:
      "Veg biryani combo for 3-4 with paneer tikka, raita, and sweets",
    price: 699.99,
    category: "specials",
    image_url:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
    spice_level: "mild",
    is_vegetarian: true,
    is_featured: false,
    available: true,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing menu items
    await MenuItem.deleteMany({});
    console.log("🗑️  Cleared existing menu items");

    // Insert sample data
    const items = await MenuItem.insertMany(sampleMenuItems);
    console.log(`✨ Successfully added ${items.length} menu items`);

    console.log("\n📋 Sample Menu Items:");
    items.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.name} - ₹${item.price} (${item.category})`
      );
    });

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
