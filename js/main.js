document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', () => navMobile.classList.toggle('open'));
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('newsletterMsg');
      if (msg) msg.textContent = "You're in! Check your email for your 10% off code.";
      newsletterForm.reset();
    });
  }

  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid && typeof PRODUCTS !== 'undefined') {
    const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
    featuredGrid.innerHTML = featured.map(renderProductCard).join('');
  }

  const shopGrid = document.getElementById('shopGrid');
  if (shopGrid && typeof PRODUCTS !== 'undefined') {
    renderShopGrid(shopGrid, PRODUCTS);
    setupFilters(shopGrid);
    setupSort(shopGrid);
    const countEl = document.getElementById('productCount');
    if (countEl) countEl.textContent = PRODUCTS.length;
  }

  const catFilters = document.getElementById('catFilters');
  if (catFilters && typeof CATEGORIES !== 'undefined') {
    catFilters.innerHTML = CATEGORIES.map(cat => `
      <label class="filter-option">
        <input type="radio" name="category" value="${cat.id}" ${cat.id === 'all' ? 'checked' : ''}>
        ${cat.label}
      </label>
    `).join('');
  }

  const detailWrap = document.getElementById('productDetail');
  if (detailWrap && typeof PRODUCTS !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) renderProductDetail(product, detailWrap);
    else detailWrap.innerHTML = '<div class="container" style="padding:8rem 2rem;color:var(--grey)">Product not found. <a href="shop.html" style="color:var(--accent)">Back to shop</a></div>';
  }

  const cartWrap = document.getElementById('cartWrap');
  if (cartWrap) renderCart(cartWrap);
});

function renderProductCard(product) {
  const img = product.images[0]
    ? `<img src="${product.images[0]}" alt="${product.name}" loading="lazy">`
    : `<div class="img-placeholder"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`;
  const badge = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
  const originalPrice = product.originalPrice
    ? `<span style="text-decoration:line-through;color:var(--grey);font-size:0.85rem;margin-right:0.5rem">$${product.originalPrice}</span>` : '';
  return `
    <div class="product-card" onclick="window.location='product.html?id=${product.id}'">
      <div class="product-img">${img}</div>
      ${badge}
      <div class="product-overlay">
        <button onclick="event.stopPropagation(); Cart.add('${product.id}');">Add to Cart</button>
      </div>
      <div class="product-info">
        <p class="product-category">${product.categoryLabel}</p>
        <p class="product-name">${product.name}</p>
        <p class="product-price">${originalPrice}$${product.price.toFixed(2)} AUD</p>
      </div>
    </div>`;
}

function renderShopGrid(grid, products) {
  grid.innerHTML = products.length
    ? products.map(renderProductCard).join('')
    : `<div style="grid-column:1/-1;padding:4rem;text-align:center;color:var(--grey)">No products found.</div>`;
  const countEl = document.getElementById('productCount');
  if (countEl) countEl.textContent = products.length;
}

function setupFilters(grid) {
  document.addEventListener('change', (e) => {
    if (e.target.name === 'category') {
      const cat = e.target.value;
      const filtered = cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
      renderShopGrid(grid, filtered);
    }
  });
}

function setupSort(grid) {
  const sortEl = document.getElementById('sortSelect');
  if (!sortEl) return;
  sortEl.addEventListener('change', () => {
    const cat = document.querySelector('input[name="category"]:checked')?.value || 'all';
    let filtered = cat === 'all' ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === cat);
    if (sortEl.value === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (sortEl.value === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (sortEl.value === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    renderShopGrid(grid, filtered);
  });
}

function renderProductDetail(product, wrap) {
  const img = product.images[0]
    ? `<img src="${product.images[0]}" alt="${product.name}">`
    : `<div style="width:100%;height:100%;background:var(--dark3);display:flex;align-items:center;justify-content:center;color:var(--grey)">No image</div>`;
  const variantHTML = Object.entries(product.variants).map(([key, options]) => `
    <div class="product-options">
      <label>${key.charAt(0).toUpperCase() + key.slice(1)}</label>
      <div class="options-grid">
        ${options.map((opt, i) => `<button class="option-btn ${i === 0 ? 'active' : ''}" onclick="selectOption(this, '${key}')">${opt}</button>`).join('')}
      </div>
    </div>`).join('');
  wrap.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-images">${img}</div>
      <div class="product-detail-info">
        <p class="product-category">${product.categoryLabel}</p>
        <h1>${product.name}</h1>
        <p class="product-detail-price">$${product.price.toFixed(2)} AUD</p>
        <p class="product-detail-desc">${product.description}</p>
        ${variantHTML}
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(-1)">−</button>
          <div class="qty-num" id="qtyDisplay">1</div>
          <button class="qty-btn" onclick="changeQty(1)">+</button>
        </div>
        <button class="btn-primary add-to-cart-btn" onclick="addToCartFromDetail('${product.id}')">Add to Cart</button>
        <button class="btn-secondary add-to-cart-btn" onclick="buyNow('${product.id}')">Buy Now</button>
      </div>
    </div>`;
}

let currentQty = 1;
function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  const el = document.getElementById('qtyDisplay');
  if (el) el.textContent = currentQty;
}

function selectOption(btn, key) {
  btn.closest('.options-grid').querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function getSelectedVariants() {
  const variants = {};
  document.querySelectorAll('.product-options').forEach(opt => {
    const label = opt.querySelector('label').textContent.toLowerCase();
    const active = opt.querySelector('.option-btn.active');
    if (active) variants[label] = active.textContent;
  });
  return variants;
}

function addToCartFromDetail(productId) {
  Cart.add(productId, currentQty, getSelectedVariants());
}

function buyNow(productId) {
  Cart.add(productId, currentQty, getSelectedVariants());
  window.location.href = 'cart.html';
}

function renderCart(wrap) {
  const items = Cart.items;
  const countEl = document.getElementById('cartItemCount');
  if (items.length === 0) {
    wrap.innerHTML = `
      <div class="cart-empty">
        <h2>Your cart is empty</h2>
        <p style="color:var(--grey);margin-bottom:2rem">Looks like you haven't added anything yet.</p>
        <a href="shop.html" class="btn-primary">Continue Shopping</a>
      </div>`;
    if (countEl) countEl.textContent = '0 items';
    return;
  }
  if (countEl) countEl.textContent = `${Cart.getCount()} item${Cart.getCount() !== 1 ? 's' : ''}`;
  const shipping = Cart.getTotal() >= 150 ? 0 : 14.95;
  const total = Cart.getTotal() + shipping;
  wrap.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${items.map(item => {
          const product = PRODUCTS.find(p => p.id === item.productId);
          if (!product) return '';
          const img = product.images[0] ? `<img src="${product.images[0]}" alt="${product.name}">` : '';
          const variantText = Object.entries(item.variants).map(([k,v]) => `${k}: ${v}`).join(', ');
          return `
            <div class="cart-item">
              <div class="cart-item-img">${img}</div>
              <div>
                <p class="cart-item-name">${product.name}</p>
                <p class="cart-item-variant">${variantText || 'Standard'}</p>
                <div class="qty-control" style="transform:scale(0.9);transform-origin:left">
                  <button class="qty-btn" onclick="cartQty('${item.productId}','${item.variantKey}',-1)">−</button>
                  <div class="qty-num">${item.quantity}</div>
                  <button class="qty-btn" onclick="cartQty('${item.productId}','${item.variantKey}',1)">+</button>
                </div>
                <button class="cart-item-remove" onclick="cartRemove('${item.productId}','${item.variantKey}')">Remove</button>
              </div>
              <div class="cart-item-price">$${(product.price * item.quantity).toFixed(2)}</div>
            </div>`;
        }).join('')}
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal</span><span>$${Cart.getTotal().toFixed(2)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span></div>
        ${shipping > 0 ? `<p style="font-size:0.75rem;color:var(--grey);margin-top:-0.25rem">Add $${(150 - Cart.getTotal()).toFixed(2)} more for free shipping</p>` : ''}
        <div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)} AUD</span></div>
        <button class="btn-primary checkout-btn" onclick="startCheckout()">Proceed to Checkout</button>
        <a href="shop.html" class="btn-secondary" style="display:block;text-align:center;margin-top:0.75rem">Continue Shopping</a>
      </div>
    </div>`;
}

function cartQty(productId, variantKey, delta) {
  const item = Cart.items.find(i => i.productId === productId && i.variantKey === variantKey);
  if (item) {
    const newQty = item.quantity + delta;
    if (newQty < 1) { cartRemove(productId, variantKey); return; }
    Cart.updateQty(productId, variantKey, newQty);
  }
  const wrap = document.getElementById('cartWrap');
  if (wrap) renderCart(wrap);
}

function cartRemove(productId, variantKey) {
  Cart.remove(productId, variantKey);
  const wrap = document.getElementById('cartWrap');
  if (wrap) renderCart(wrap);
}

function startCheckout() {
  window.location.href = 'checkout.html';
}
