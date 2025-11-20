# Biryani House Backend API

Express.js REST API with MongoDB for the Biryani House restaurant application.

## Setup

1. **Install Dependencies**

```bash
cd backend
npm install
```

2. **Environment Variables**
   The `.env` file is already configured with your MongoDB connection string.

3. **Seed Database**

```bash
npm run seed
```

4. **Start Server**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Menu Items

- `GET /api/menu-items` - Get all menu items
  - Query params: `?category=biryani&is_featured=true&available=true`
- `GET /api/menu-items/:id` - Get single menu item
- `POST /api/menu-items` - Create new menu item
- `PUT /api/menu-items/:id` - Update menu item
- `DELETE /api/menu-items/:id` - Delete menu item

### Orders

- `GET /api/orders` - Get all orders
  - Query params: `?status=pending&customer_phone=1234567890&sort=-order_date`
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order

### Health Check

- `GET /api/health` - Check API status

## Example Requests

### Create Order

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "customer_phone": "9876543210",
    "customer_email": "john@example.com",
    "delivery_address": "123 Main St, Mumbai",
    "total_amount": 598,
    "items": [
      {
        "menu_item_id": "...",
        "menu_item_name": "Hyderabadi Chicken Biryani",
        "quantity": 2,
        "price": 299,
        "subtotal": 598
      }
    ]
  }'
```

### Get Featured Menu Items

```bash
curl http://localhost:5000/api/menu-items?is_featured=true
```

## Database Schema

### MenuItem

- name (String, required)
- description (String, required)
- price (Number, required)
- category (String: biryani, beverages, sweets, sides, specials)
- image_url (String)
- available (Boolean)
- spice_level (String: none, mild, medium, hot, extra_hot)
- is_vegetarian (Boolean)
- is_featured (Boolean)

### Order

- customer_name (String, required)
- customer_phone (String, required, 10 digits)
- customer_email (String, optional)
- delivery_address (String, required)
- special_instructions (String, optional)
- total_amount (Number, required)
- order_date (Date)
- status (String: pending, confirmed, preparing, out_for_delivery, delivered, cancelled)
- items (Array of OrderItems)

## Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **express-validator** - Request validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables
