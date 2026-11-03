/* ============================================================
   AROMA COFFEE — Main JavaScript
   ============================================================ */

// ---------- Menu data ----------
const MENU = [
  { id: 1, name: 'Espresso', cat: 'espresso', price: 3.50, desc: 'Rich, bold single shot with golden crema.', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80', badge: 'Classic' },
  { id: 2, name: 'Double Espresso', cat: 'espresso', price: 4.50, desc: 'Two shots of pure intensity.', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Cappuccino', cat: 'espresso', price: 4.75, desc: 'Espresso, steamed milk, velvety foam.', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80', badge: 'Popular' },
  { id: 4, name: 'Flat White', cat: 'espresso', price: 4.75, desc: 'Silky microfoam over ristretto shots.', img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b68?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Latte', cat: 'espresso', price: 5.00, desc: 'Smooth espresso with creamy steamed milk.', img: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Mocha', cat: 'espresso', price: 5.50, desc: 'Espresso, chocolate, milk, whipped cream.', img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=600&q=80' },
  { id: 7, name: 'Cold Brew', cat: 'cold', price: 4.50, desc: 'Slow-steeped 18 hours, smooth & bold.', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', badge: 'Bestseller' },
  { id: 8, name: 'Iced Latte', cat: 'cold', price: 5.25, desc: 'Espresso over ice with cold milk.', img: 'https://images.unsplash.com/photo-1517701553010-31349d5c102e?auto=format&fit=crop&w=600&q=80' },
  { id: 9, name: 'Nitro Cold Brew', cat: 'cold', price: 5.75, desc: 'Nitrogen-infused, creamy cascade.', img: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=600&q=80' },
  { id: 10, name: 'Iced Mocha', cat: 'cold', price: 5.75, desc: 'Chocolate, espresso, milk over ice.', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80' },
  { id: 11, name: 'Caramel Macchiato', cat: 'specialty', price: 5.75, desc: 'Vanilla, milk, espresso, caramel drizzle.', img: 'https://images.unsplash.com/photo-1485808191679-5f8c7c8606af?auto=format&fit=crop&w=600&q=80', badge: 'Signature' },
  { id: 12, name: 'Honey Lavender Latte', cat: 'specialty', price: 6.00, desc: 'Floral lavender with wildflower honey.', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80' },
  { id: 13, name: 'Pumpkin Spice Latte', cat: 'specialty', price: 6.00, desc: 'Seasonal pumpkin, cinnamon, nutmeg.', img: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80' },
  { id: 14, name: 'Matcha Latte', cat: 'specialty', price: 5.50, desc: 'Ceremonial grade matcha, oat milk.', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=600&q=80' },
  { id: 15, name: 'Croissant', cat: 'pastry', price: 3.75, desc: 'Buttery, flaky, baked fresh daily.', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80' },
  { id: 16, name: 'Almond Croissant', cat: 'pastry', price: 4.50, desc: 'Filled with almond cream, topped with slices.', img: 'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=600&q=80' },
  { id: 17, name: 'Blueberry Muffin', cat: 'pastry', price: 3.50, desc: 'Bursting with fresh blueberries.', img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=600&q=80' },
  { id: 18, name: 'Cinnamon Roll', cat: 'pastry', price: 4.25, desc: 'Warm, gooey, cream cheese frosting.', img: 'https://images.unsplash.com/photo-1509365465985-25d49c9f6648?auto=format&fit=crop&w=600&q=80', badge: 'Fresh' },
];

// ---------- Cart state ----------
let cart = JSON.parse(localStorage.getItem('aroma_cart') || '[]');

function saveCart() { localStorage.setItem('aroma_cart', JSON.stringify(cart)); }

function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...item, qty: 1 });
  saveCart();
  updateCartUI();
  showToast(`${item.name} added — ready for pickup`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function cartTotal() {
  return cart.reduce((s, c) => s + c.price * c.qty, 0);
}

function updateCartUI() {
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const badge = document.querySelector('.cart-badge');
  if (!itemsEl) return;
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p style="text-align:center;color:var(--muted);padding:40px 0;">Your cart is empty. Order ahead for pickup!</p>';
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div class="cart-item">
        <img src="${c.img}" alt="${c.name}" />
        <div class="info">
          <div class="name">${c.name}</div>
          <div class="price">$${c.price.toFixed(2)}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px;">
            <button onclick="changeQty(${c.id},-1)" style="width:24px;height:24px;border-radius:50%;background:var(--cream);">-</button>
            <span>${c.qty}</span>
            <button onclick="changeQty(${c.id},1)" style="width:24px;height:24px;border-radius:50%;background:var(--cream);">+</button>
            <button onclick="removeFromCart(${c.id})" style="margin-left:auto;color:var(--muted);"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    `).join('');
  }
  if (totalEl) totalEl.textContent = '$' + cartTotal().toFixed(2);
  const count = cart.reduce((s, c) => s + c.qty, 0);
  if (badge) badge.textContent = count;
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.style.display = count > 0 ? 'flex' : 'flex';
}

// ---------- Toast ----------
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ---------- Navbar scroll ----------
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (ham && links) {
    ham.addEventListener('click', () => links.classList.toggle('open'));
  }
}

// ---------- Reveal on scroll ----------
function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}

// ---------- Counter animation ----------
function initCounters() {
  const nums = document.querySelectorAll('[data-count]');
  if (!nums.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.textContent.replace(/[0-9]/g, '');
      let cur = 0;
      const step = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        cur += step;
        if (cur >= target) { cur = target; clearInterval(timer); }
        el.textContent = cur + (target >= 100 ? 'K' : '');
      }, 25);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => io.observe(n));
}

// ---------- Particles ----------
function initParticles() {
  const box = document.getElementById('particles');
  if (!box) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 8 + 's';
    p.style.animationDuration = (6 + Math.random() * 6) + 's';
    box.appendChild(p);
  }
}

// ---------- Menu rendering ----------
function renderMenu(containerId, filter = 'all', limit = null) {
  const el = document.getElementById(containerId);
  if (!el) return;
  let items = filter === 'all' ? MENU : MENU.filter(m => m.cat === filter);
  if (limit) items = items.slice(0, limit);
  el.innerHTML = items.map(m => `
    <div class="menu-card reveal" data-cat="${m.cat}">
      <div class="img">
        <img src="${m.img}" alt="${m.name}" loading="lazy" />
        ${m.badge ? `<span class="badge">${m.badge}</span>` : ''}
        <button class="fav" aria-label="Favorite"><i class="far fa-heart"></i></button>
      </div>
      <div class="info">
        <div class="row">
          <span class="name">${m.name}</span>
          <span class="price">$${m.price.toFixed(2)}</span>
        </div>
        <p class="desc">${m.desc}</p>
        <button class="add" onclick='addToCart(${JSON.stringify(m)})'><i class="fas fa-plus"></i> Add to Cart</button>
      </div>
    </div>
  `).join('');
  initReveal();
}

function initMenuTabs() {
  const tabs = document.querySelectorAll('#menuTabs .tab');
  if (!tabs.length) return;
  tabs.forEach(t => {
    t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
      renderMenu('menuGrid', t.dataset.cat);
    });
  });
}

// ---------- Cart drawer toggle ----------
function initCart() {
  const openBtn = document.getElementById('cartBtn');
  const closeBtn = document.getElementById('closeCart');
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');
  const toggle = () => {
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
  };
  if (openBtn) openBtn.addEventListener('click', toggle);
  if (closeBtn) closeBtn.addEventListener('click', toggle);
  if (overlay) overlay.addEventListener('click', toggle);
  updateCartUI();
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initReveal();
  initCounters();
  initParticles();
  initMenuTabs();
  initCart();
  if (document.getElementById('menuGrid')) renderMenu('menuGrid', 'all', 8);
  if (document.getElementById('fullMenuGrid')) renderMenu('fullMenuGrid', 'all');
});

// expose
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.changeQty = changeQty;
window.showToast = showToast;
