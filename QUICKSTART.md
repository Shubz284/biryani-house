# 🚀 Quick Start Guide - Biryani House

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (already configured)

## 1. Start Backend (Terminal 1)

```bash
cd backend
npm install
npm run seed    # Optional: Add 10 sample menu items
npm run dev     # Starts on http://localhost:5000
```

Expected output:

```
✅ MongoDB Connected: cluster0.7zyecy6.mongodb.net
🚀 Server is running on port 5000
📍 Environment: development
```

## 2. Frontend Already Running (Terminal 2)

The frontend should already be running on `http://localhost:5173`

If not:

```bash
npm run dev     # In the root directory
```

## 3. Test the Application

### Browse Menu

1. Open `http://localhost:5173/menu`
2. You should see menu items loaded from MongoDB
3. Filter by category or spice level

### Place an Order

1. Add items to cart
2. Go to Cart → Checkout
3. Fill in customer details
4. Submit order
5. Check Orders page to see your order

### Verify in MongoDB

- Login to [MongoDB Atlas](https://cloud.mongodb.com/)
- Navigate to your `biryani_house` database
- Collections: `menuitems` and `orders`

## API Testing (Optional)

### Get all menu items

```bash
curl http://localhost:5000/api/menu-items
```

### Get featured items

```bash
curl http://localhost:5000/api/menu-items?is_featured=true
```

### Create an order (test)

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Test User",
    "customer_phone": "9876543210",
    "delivery_address": "123 Test St",
    "total_amount": 299,
    "items": [{
      "menu_item_id": "YOUR_MENU_ITEM_ID",
      "menu_item_name": "Hyderabadi Chicken Biryani",
      "quantity": 1,
      "price": 299,
      "subtotal": 299
    }]
  }'
```

## Project Structure

```
biryani_house/
├── backend/              # Express.js + MongoDB
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── config/          # DB connection
│   └── server.js        # Entry point
├── src/                 # React frontend
│   ├── api/            # API client
│   ├── Pages/          # Route components
│   ├── components/     # Reusable components
│   └── App.jsx         # Root component
└── package.json        # Frontend dependencies
```

## Common Issues

### Backend won't start

- Check MongoDB connection string in `backend/.env`
- Ensure MongoDB Atlas allows your IP address
- Run `npm install` in backend folder

### Frontend can't fetch data

- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API URL in `src/api/base44Client.js`

### Empty menu

- Run `npm run seed` in backend folder
- Check MongoDB Atlas for data

## Development Tips

- **Frontend Hot Reload**: Changes auto-refresh
- **Backend Hot Reload**: Using nodemon, server restarts on changes
- **React Query DevTools**: Add to see cache state
- **MongoDB Compass**: Desktop app for easier DB viewing

## Next Features to Add

1. User authentication
2. Admin dashboard
3. Order status updates
4. Payment integration
5. Email notifications

---

Need help? Check `SETUP_GUIDE.md` or `backend/README.md`
