# Image Management Guide

## Current Setup: Unsplash URLs

The database is currently configured to use **Unsplash image URLs**. This is the recommended approach for development and initial deployment because:

✅ **Advantages:**

- No need to download/store images locally
- Free, high-quality food photography
- Fast CDN delivery
- No bandwidth costs from your server
- Easy to swap images by changing URLs

❌ **Disadvantages:**

- Requires internet connection
- Dependent on Unsplash availability
- Limited control over images

## Option 1: Keep Using Unsplash URLs (Recommended for MVP)

**Current Implementation:**
All menu items already have Unsplash URLs in the seed database. Just run:

```bash
cd backend
npm run seed
```

This will populate your database with items using Unsplash images.

## Option 2: Use Local Images

If you want to use your own custom food images:

### Step 1: Prepare Your Images

1. Create `public/images/menu/` directory:

```bash
mkdir -p public/images/menu/biryani
mkdir -p public/images/menu/beverages
mkdir -p public/images/menu/sweets
mkdir -p public/images/menu/sides
mkdir -p public/images/menu/specials
```

2. Add your images with descriptive names:

```
public/images/menu/
  biryani/
    hyderabadi-dum-biryani.jpg
    paneer-tikka-biryani.jpg
    vegetable-biryani.jpg
    ...
  beverages/
    mango-lassi.jpg
    cold-coffee.jpg
    ...
```

### Step 2: Update Seed Database

Edit `backend/scripts/seedDatabase.js` and change image URLs:

```javascript
// OLD (Unsplash)
image_url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80";

// NEW (Local)
image_url: "/images/menu/biryani/hyderabadi-dum-biryani.jpg";
```

### Step 3: Serve Static Files

The frontend Vite dev server automatically serves files from `public/` directory, so images will be available at `http://localhost:5173/images/menu/...`

For production, ensure your build process includes the `public` folder.

## Option 3: Hybrid Approach (Recommended for Production)

Use a combination:

1. **Development:** Unsplash URLs (current setup)
2. **Production:** Upload to cloud storage (AWS S3, Cloudinary, etc.)

### Using Cloudinary (Free tier available):

1. Sign up at https://cloudinary.com
2. Upload your images
3. Get URLs like: `https://res.cloudinary.com/your-account/image/upload/menu/biryani.jpg`
4. Update database URLs

### Using AWS S3:

1. Create S3 bucket
2. Upload images
3. Configure public access
4. Get URLs like: `https://your-bucket.s3.amazonaws.com/menu/biryani.jpg`

## Image Specifications

For best results, use these image specs:

- **Format:** JPG (for photos) or PNG (for graphics)
- **Resolution:** 800x600px minimum (maintains 4:3 aspect ratio)
- **File Size:** < 200KB per image (use compression tools)
- **Optimization:** Run through TinyPNG or ImageOptim

## Current Menu Items & Images

The seed database includes **30 items** with Unsplash URLs:

### Biryani (7 items) - Starting from ₹120

- Hyderabadi Dum Biryani - ₹169.99
- Paneer Tikka Biryani - ₹159.99
- Vegetable Biryani - ₹139.99
- Egg Biryani - ₹129.99
- Chicken Biryani - ₹149.99
- Mutton Biryani - ₹199.99
- Prawns Biryani - ₹229.99

### Beverages (9 items) - Coffee, Shakes, Soft Drinks

- Mango Lassi - ₹49.99
- Masala Chai - ₹39.99
- Fresh Lime Soda - ₹34.99
- Cold Coffee - ₹69.99
- Chocolate Shake - ₹79.99
- Strawberry Shake - ₹79.99
- Coca Cola - ₹29.99
- Sprite - ₹29.99
- Thumbs Up - ₹29.99

### Sweets (3 items)

- Rasmalai - ₹69.99
- Kheer - ₹49.99
- Gulab Jamun - ₹59.99

### Sides (3 items)

- Raita - ₹39.99
- Papad - ₹19.99
- Onion Salad - ₹29.99

### Specials (4 items) - Shareable items only

- Family Combo Pack - ₹899.99
- Special Feast Biryani - ₹499.99
- Party Pack Biryani - ₹1299.99
- Vegetarian Feast - ₹699.99

## Recommendation

**For now, stick with Unsplash URLs** - they're already configured and will work immediately after seeding the database. Later, when you have professional photos of your actual dishes, you can:

1. Take photos of your real dishes
2. Upload to Cloudinary (free tier: 25GB storage, 25GB bandwidth/month)
3. Update the database with new URLs

This gives you flexibility without immediate overhead!
