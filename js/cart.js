const Cart = {
  items: [],

  init() {
    const saved = localStorage.getItem('rgg_cart');
    if (saved) this.items = JSON.parse(saved);
    this.updateUI();
  },

  save() {
    localStorage.setItem('rgg_cart', JSON.stringify(this.items));
    this.updateUI();
  },

  add(productId, quantity = 1, variants = {}) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const variantKey = JSON.stringify(variants);
    const existing = this.items.find(i => i.productId === productId && JSON.stringify(i.variants) === variantKey);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ productId, quantity, variants, variantKey });
    }
    this.save();
    showToast(`${product.name} added to cart`);
  },

  remove(productId, variantKey) {
    this.items = this.items.filter(i => !(i.productId === productId && i.variantKey === variantKey));
    this.save();
  },

  updateQty(productId, variantKey, qty) {
    const item = this.items.find(i => i.productId === productId && i.variantKey === variantKey);
    if (item) {
      item.quantity = Math.max(1, qty);
      this.save();
    }
  },

  getTotal() {
    return this.items.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  clear() {
    this.items = [];
    this.save();
  },

  updateUI() {
    const countEl = document.getElementById('cartCount');
    if (countEl) {
      const count = this.getCount();
      countEl.textContent = count;
      countEl.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

document.addEventListener('DOMContentLoaded', () => Cart.init());
