# Real G's Golf — Website

Premium golf e-commerce site. Free hosting via Vercel + GitHub Pages.

---

## File Structure

```
realgs-golf/
├── index.html          ← Homepage
├── shop.html           ← Shop / product listing
├── product.html        ← Individual product page
├── cart.html           ← Shopping cart
├── checkout.html       ← Checkout with Stripe
├── order-success.html  ← Order confirmation
├── about.html          ← About page
├── contact.html        ← Contact page
├── shipping.html       ← Shipping policy
├── returns.html        ← Returns policy
├── privacy.html        ← Privacy policy
├── terms.html          ← Terms of service
├── admin.html          ← Admin panel (password protected)
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── products.js     ← YOUR PRODUCT CATALOGUE (edit this to add products)
│   ├── cart.js         ← Cart logic
│   └── main.js         ← Page rendering & interactions
├── api/
│   ├── create-payment-intent.js  ← Stripe payment backend
│   └── order-notification.js     ← Email notification backend
├── vercel.json         ← Vercel deployment config
└── package.json        ← Node dependencies
```

---

## DEPLOYMENT STEPS

### Step 1 — Push to GitHub

1. Go to github.com and create a new repository called `realgs-golf`
2. Make it **Public**
3. Upload all these files (drag and drop in GitHub's web interface, or use GitHub Desktop)

### Step 2 — Deploy to Vercel

1. Go to vercel.com and sign in with your GitHub account
2. Click "Add New Project"
3. Select your `realgs-golf` repository
4. Click "Deploy" — Vercel auto-detects everything
5. Your site will be live at `realgs-golf.vercel.app` in ~2 minutes

### Step 3 — Set Up Stripe (to accept payments)

1. Go to stripe.com and create a free account
2. In your Stripe dashboard, go to Developers → API Keys
3. Copy your **Publishable Key** (starts with `pk_live_` or `pk_test_`)
4. Copy your **Secret Key** (starts with `sk_live_` or `sk_test_`)
5. In `checkout.html`, replace `pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE` with your publishable key
6. In Vercel dashboard → your project → Settings → Environment Variables, add:
   - `STRIPE_SECRET_KEY` = your secret key

### Step 4 — Set Up Order Email Notifications (optional but recommended)

1. Go to resend.com and create a free account (3,000 emails/month free)
2. Get your API key
3. In Vercel → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = your Resend API key
   - `YOUR_EMAIL` = your email address (e.g. louis@gmail.com)

### Step 5 — Connect a Custom Domain (optional)

1. Buy your domain at namecheap.com (e.g. `realggsgolf.com.au`)
2. In Vercel → your project → Settings → Domains
3. Add your domain and follow the DNS instructions

---

## ADDING PRODUCTS

Open `js/products.js` and copy/paste a product block:

```javascript
{
  id: "rgg-007",                          // Unique ID (increment number)
  name: "Your Product Name",
  category: "clubs",                      // clubs / balls / apparel / bags / accessories
  categoryLabel: "Clubs",
  price: 99.99,
  originalPrice: null,                    // Set to a number for a sale price, or null
  badge: null,                            // "New", "Sale", or null
  description: "Your product description here.",
  images: ["https://your-image-url.jpg"], // Product image URL from AliExpress or Unsplash
  variants: {
    size: ["S", "M", "L", "XL"],         // Add/remove variant types as needed
  },
  stock: 99,
  featured: false,                        // true = shows on homepage
  aliexpressUrl: "https://www.aliexpress.com/item/YOUR-ITEM-ID.html"
},
```

---

## ADMIN PANEL

Go to `yoursite.com/admin.html`

Default password: `realgs2025`

**IMPORTANT: Change this password** — open `admin.html` and find line:
```javascript
const ADMIN_PASSWORD = 'realgs2025';
```
Change it to something secure before going live.

The admin panel lets you:
- See all pending orders
- Click through to AliExpress to fulfil each order
- Mark orders as fulfilled
- Add new products

---

## FULFILMENT PROCESS (2 mins per order)

1. New order arrives → you get an email notification
2. Go to admin.html
3. See the order with customer name, address, items ordered
4. Click the AliExpress link next to the product
5. On AliExpress, enter the **customer's address** as the shipping address
6. Complete the AliExpress purchase (your cost price)
7. Click "Mark Fulfilled" in admin
8. AliExpress ships directly to your customer — done

---

## QUESTIONS?

Email: hello@realggsgolf.com
