# 🍛 Biryani House - Full Stack Setup Complete!

## Backend Setup (MongoDB + Express.js)

Your backend has been created in the `backend/` folder with the following structure:

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/
│   ├── MenuItem.js          # Menu item schema
│   └── Order.js             # Order schema
├── routes/
│   ├── menuItems.js         # Menu API routes
│   └── orders.js            # Orders API routes
├── scripts/
│   └── seedDatabase.js      # Sample data seeder
├── .env                     # Environment variables (MongoDB URI included)
├── server.js                # Express server
└── package.json             # Dependencies

```

### 🚀 Start the Backend

Open a **new terminal** and run:

```bash
cd backend
npm install
npm run seed      # Optional: Add sample menu items
npm run dev       # Start server on http://localhost:5000
```

## Frontend Updates

✅ Updated `src/api/base44Client.js` to connect to the real backend API
✅ All API calls now go to `http://localhost:5000/api`

### 🌐 Start the Frontend

The frontend is already running at `http://localhost:5173`

## API Endpoints

### Menu Items

- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items?is_featured=true` - Get featured items
- `GET /api/menu-items?category=biryani` - Filter by category
- `POST /api/menu-items` - Create menu item
- `PUT /api/menu-items/:id` - Update menu item
- `DELETE /api/menu-items/:id` - Delete menu item

### Orders

- `GET /api/orders` - Get all orders
- `GET /api/orders?sort=-order_date` - Get orders sorted by date
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Health Check

- `GET /api/health` - Check if API is running

## Database Connection

Your MongoDB Atlas connection is already configured:

- **URI**: `mongodb+srv://shubx76:hhK2bAy3g18K6iL6@cluster0.7zyecy6.mongodb.net/biryani_house`
- **Database**: `biryani_house`

## Testing the Full Stack

1. **Start Backend** (Terminal 1):

   ```bash
   cd backend
   npm install
   npm run seed    # Adds 10 sample menu items
   npm run dev     # Server runs on port 5000
   ```

2. **Frontend Already Running** (Terminal 2):

   ```
   Already at http://localhost:5173
   ```

3. **Test the Connection**:
   - Open `http://localhost:5173` in your browser
   - The Menu page should now load real data from MongoDB!
   - Try adding items to cart and creating an order

## Features Implemented

✅ **Backend**:

- Express.js REST API
- MongoDB with Mongoose ODM
- Input validation with express-validator
- CORS enabled for frontend
- Error handling middleware
- Database seeding script

✅ **Frontend**:

- Connected to real backend API
- React Query for data fetching & caching
- Shopping cart with localStorage
- Order management
- Shadcn UI components

## Next Steps

1. **Install and start the backend** (see commands above)
2. **Test creating an order** from the frontend
3. **View orders in MongoDB Atlas** to verify data persistence
4. **Customize sample data** in `backend/scripts/seedDatabase.js`

## Environment Variables

The `.env` file is already configured but **DO NOT commit it to Git** (it's in `.gitignore`)

For production, you'll want to:

- Use environment variables instead of hardcoded values
- Add authentication/authorization
- Implement rate limiting
- Add proper error logging

## Troubleshooting

**If backend fails to connect to MongoDB:**

- Check your MongoDB Atlas network access (allow your IP)
- Verify the connection string in `backend/.env`
- Check MongoDB Atlas cluster is active

**If frontend can't connect to backend:**

- Ensure backend is running on port 5000
- Check CORS settings in `backend/server.js`
- Look for errors in browser console (F12)

---

🎉 **You're all set!** Start the backend and watch your full-stack restaurant app come to life!
