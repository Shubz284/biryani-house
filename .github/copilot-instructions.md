# Sizzling Spices Biryani House - AI Coding Instructions

## Project Overview

React SPA for a biryani restaurant with menu browsing, cart management, and order placement. Uses Vite, React 19, Tailwind CSS, and Base44 backend.

## Critical Architecture Decisions

### Shadcn UI Integration (JavaScript)

**SETUP COMPLETE**: The project uses Shadcn UI in JavaScript mode (not TypeScript):

- All UI components in `src/components/ui/` (button, card, badge, input, label, textarea, tabs)
- Utils library at `src/lib/utils.js` with `cn()` helper for className merging
- `components.json` configured with `tsx: false` for JavaScript support
- Tailwind CSS configured with PostCSS (traditional setup, not Vite plugin)
- All required dependencies installed: `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`

**Adding New Components**: Use `npx shadcn@latest add [component-name]` - it will automatically create `.jsx` files.

### Data Architecture: Express.js + MongoDB Backend

- **Backend API**: Express.js server at `http://localhost:5000/api`
- **Database**: MongoDB Atlas (connection configured in `backend/.env`)
- **Frontend Client**: `src/api/base44Client.js` - RESTful API wrapper
- **Entities**: Defined as Mongoose schemas in `backend/models/`
  - `MenuItem.js` - Menu items with categories, prices, spice levels
  - `Order.js` - Customer orders with items, status tracking
- **API Pattern**: `base44.entities.MenuItem.list()`, `base44.entities.Order.create(orderData)`
- **React Query**: For client-side caching with `useQuery` and `useMutation`
- **Validation**: express-validator on backend, field validation in Mongoose schemas

### State Management: localStorage Cart

- Shopping cart stored in `localStorage` with key `"cart"`
- Cart structure: `[{ id, name, price, image_url, quantity }]`
- Custom event `"cartUpdated"` dispatched after cart modifications: `window.dispatchEvent(new Event("cartUpdated"))`
- Layout.js listens to both `"storage"` and `"cartUpdated"` events to sync cart badge count
- Cart updates trigger re-renders via event listeners, not React state

### File Organization

- **Pages/**: Full page components (Home, Menu, Cart, Checkout, Orders) - all `.jsx`
- **Components/**: Reusable components (MenuCard) - `.jsx`
- **components/ui/**: Shadcn UI components (auto-generated) - all `.jsx`
- **Entities/**: JSON schema definitions (MenuItem, Order) - **Reference only, not used by frontend**
- **lib/**: Utility functions (`utils.js` with `cn()` helper)
- **api/**: API clients (`base44Client.js` - connects to Express backend)
- **Layout.jsx**: Shared layout with nav/footer
- **App.jsx**: Router setup with React Router and React Query provider
- **utils.js**: Helper functions (`createPageUrl()` for routing)
- **backend/**: Express.js + MongoDB server (separate Node.js app)
  - `models/`: Mongoose schemas (MenuItem, Order)
  - `routes/`: API endpoints (menuItems, orders)
  - `config/`: Database connection
  - `server.js`: Express app entry point

## Development Patterns

### Path Aliasing

- `@/*` maps to `./src/*` (configured in root `jsconfig.json` and `vite.config.js`)
- Always import with `@/` prefix: `import { base44 } from "@/api/base44Client"`
- Do NOT use relative paths like `../api/base44Client`
- Vite resolve alias configured with Node.js `path` module

### Styling Conventions

- Tailwind CSS with PostCSS (traditional setup for Shadcn compatibility)
- Shadcn CSS variables defined in `src/index.css` (HSL color system)
- Custom brand colors in Layout.js: `--primary: #FF6B35`, `--secondary: #8B0000`, `--accent: #FFA500`
- Gradient backgrounds: `bg-gradient-to-br from-orange-50 via-white to-amber-50`
- Orange/red color scheme: `from-orange-600 to-red-700` for CTAs
- Sticky nav: `sticky top-0 z-50 bg-white/95 backdrop-blur-lg`
- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes

### Component Patterns

- Use Lucide React icons: `import { ShoppingCart, Menu, Phone } from "lucide-react"`
- Framer Motion for animations: `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>`
- Shadcn UI components from `@/components/ui/*` - use CLI to add: `npx shadcn@latest add [component]`
- All Shadcn components are `.jsx` files (JavaScript, not TypeScript)

### Routing Pattern

- React Router v6 configured in `App.jsx` with `<BrowserRouter>`
- Navigation uses `createPageUrl(pageName)` helper from `@/utils.js`
- Page names: "Home", "Menu", "Cart", "Checkout", "Orders"
- Routes: `/` (Home), `/menu`, `/cart`, `/checkout`, `/orders`
- Layout component wraps all routes for consistent header/footer

## Build & Dev Commands

### Frontend (Vite + React)

```bash
npm run dev      # Start Vite dev server on port 5173
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend (Express + MongoDB)

```bash
cd backend
npm install      # Install dependencies
npm run dev      # Start server on port 5000 (with nodemon)
npm start        # Start server (production)
npm run seed     # Seed database with sample menu items
```

**Note**: Run both frontend and backend concurrently for full-stack development.

## Key Technical Details

- **Vite Fork**: Uses `rolldown-vite@7.2.2` (faster bundler) instead of standard Vite
- **React 19**: Latest version with new hooks/features
- **ESLint Config**: Flat config format (eslint.config.js) with React hooks/refresh plugins
- **Unused Var Pattern**: Variables starting with uppercase or underscore ignored by linter

## Common Workflows

### Adding a New Menu Category

1. Update `categories` array in `src/Pages/Menu.jsx`
2. Add enum value to `src/Entities/MenuItem` schema under `category.enum`
3. Ensure filtering logic handles new category in `filteredItems`

### Adding UI Components

- Create in `src/components/ui/` (likely need to generate Shadcn components)
- Use Tailwind for styling
- Follow existing component patterns (Card, Button, Badge structures)

### Order Flow

1. Menu → Add to Cart (localStorage)
2. Cart → Review & Modify
3. Checkout → Create Order via `base44.entities.Order.create()`
4. Orders → List via `base44.entities.Order.list("-created_date")`
5. After order creation, `localStorage.removeItem("cart")` and dispatch `"cartUpdated"`

## Next Steps / TODO

- **Backend is ready!** MongoDB connection string configured
- Start backend with `cd backend && npm install && npm run seed && npm run dev`
- Add authentication/authorization (JWT tokens)
- Implement admin panel for menu management
- Add image upload for menu items (use Cloudinary or AWS S3)
- Add payment gateway integration
- Implement order status notifications (email/SMS)
- Add React Query DevTools for development debugging
- Deploy backend to Heroku/Railway/Render
- Deploy frontend to Vercel/Netlify
