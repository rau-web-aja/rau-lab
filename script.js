/* RAU Lab — cart, catalog, checkout */
"use strict";

const WHATSAPP_NUMBER = "6281234567890";
const STORAGE_KEY = "rauLabCart";

const products = [
  { id:"original-clear", name:"RAU Lab Original Clear", price:35000, description:"Kilau bening untuk tampilan bibir natural.", tag:"EVERYDAY", image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80" },
  { id:"coffee-scrub", name:"RAU Lab Coffee Scrub", price:36000, description:"Nuansa hangat yang effortless.", tag:"WARM TONE", image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80" },
  { id:"rose-pink", name:"RAU Lab Rose Pink", price:37000, description:"Sentuhan pink lembut yang manis.", tag:"SOFT PINK", image:"https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80" },
  { id:"peach-nude", name:"RAU Lab Peach Nude", price:38000, description:"Warna peach nude untuk kesan fresh.", tag:"NUDE GLOW", image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80" },
  { id:"mint-fresh", name:"RAU Lab Mint Fresh", price:38000, description:"Pilihan clean untuk ritual harian.", tag:"FRESH FEEL", image:"https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=700&q=80" },
  { id:"honey-glow", name:"RAU Lab Honey Glow", price:39000, description:"Kilau hangat dengan karakter lembut.", tag:"GOLDEN HOUR", image:"https://images.unsplash.com/photo-1599733589046-833d8d2b9d9c?auto=format&fit=crop&w=700&q=80" },
  { id:"cherry-red", name:"RAU Lab Cherry Red", price:40000, description:"Merah cerah untuk tampilan lebih berani.", tag:"BOLD MOOD", image:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80" },
  { id:"berry-plump", name:"RAU Lab Berry Plump", price:41000, description:"Berry tone yang playful dan modern.", tag:"BERRY TONE", image:"https://images.unsplash.com/photo-1591360236480-4ed861025fa1?auto=format&fit=crop&w=700&q=80" },
  { id:"golden-gleam", name:"RAU Lab Golden Gleam", price:43000, description:"Sentuhan glow untuk momen spesial.", tag:"LIMITED FEEL", image:"https://images.unsplash.com/photo-1607602132700-068258a7b2c2?auto=format&fit=crop&w=700&q=80" }
];

const rupiah = amount => new Intl.NumberFormat("id-ID", {
  style:"currency", currency:"IDR", maximumFractionDigits:0
}).format(amount);

const $ = selector => document.querySelector(selector);
const productGrid = $("#product-grid");
const cartDrawer = $("#cart-drawer");
const cartOverlay = $("#cart-overlay");
const cartItemsEl = $("#cart-items");
const toast = $("#toast");

let cart = loadCart();

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(item => products.some(p => p.id === item.id) && Number.isInteger(item.qty) && item.qty > 0);
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getProduct(id) {
  return products.find(product => product.id === id);
}

function cartQuantity() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + getProduct(item.id).price * item.qty, 0);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function renderProducts() {
  productGrid.innerHTML = products.map((product, index) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy"
          onerror="this.src='https://placehold.co/700x875/f0eae4/77736c?text=RAU+Lab';" />
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
        </div>
        <button class="add-button shrink-0" data-add="${product.id}" aria-label="Tambah ${product.name} ke keranjang">+</button>
      </div>
      <p class="product-price mt-3">${rupiah(product.price)}</p>
    </article>
  `).join("");
}

function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty:1 });
  saveCart();
  renderCart();
  showToast("Produk ditambahkan ke keranjang");
}

function changeQuantity(id, amount) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.qty += amount;
  if (item.qty <= 0) cart = cart.filter(entry => entry.id !== id);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  showToast("Produk dihapus dari keranjang");
}

function renderCart() {
  $("#cart-count").textContent = cartQuantity();
  $("#cart-total").textContent = rupiah(cartTotal());
  $("#checkout-total").textContent = rupiah(cartTotal());

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="cart-empty">Your bag is waiting.</div>';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => {
    const product = getProduct(item.id);
    return `
      <div class="cart-line">
        <img src="${product.image}" alt="${product.name}" />
        <div>
          <h3 class="cart-line-title">${product.name}</h3>
          <p class="mt-1 text-xs">${rupiah(product.price)}</p>
          <div class="qty-control">
            <button type="button" data-qty="-1" data-id="${item.id}" aria-label="Kurangi jumlah">−</button>
            <span>${item.qty}</span>
            <button type="button" data-qty="1" data-id="${item.id}" aria-label="Tambah jumlah">+</button>
            <button type="button" class="remove-button ml-2" data-remove="${item.id}">Hapus</button>
          </div>
        </div>
        <strong class="text-xs">${rupiah(product.price * item.qty)}</strong>
      </div>
    `;
  }).join("");
}

function openCart() {
  cartOverlay.classList.remove("hidden");
  requestAnimationFrame(() => cartOverlay.classList.add("visible"));
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overflow-hidden");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("visible");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overflow-hidden");
  window.setTimeout(() => cartOverlay.classList.add("hidden"), 250);
}

function openCheckout() {
  if (cart.length === 0) {
    showToast("Keranjang masih kosong");
    return;
  }
  closeCart();
  $("#checkout").classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
  window.scrollTo({ top:0, behavior:"smooth" });
}

function closeCheckout() {
  $("#checkout").classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

function buildWhatsAppMessage(formData) {
  const lines = cart.map((item, index) => {
    const product = getProduct(item.id);
    return `${index + 1}. ${product.name}\n   ${item.qty} x ${rupiah(product.price)} = ${rupiah(product.price * item.qty)}`;
  });

  return [
    "Halo RAU Lab! Saya ingin memesan:",
    "",
    ...lines,
    "",
    `*TOTAL: ${rupiah(cartTotal())}*`,
    "",
    "*DETAIL PENERIMA*",
    `Nama: ${formData.name}`,
    `No. WhatsApp: ${formData.phone}`,
    `Alamat: ${formData.address}`,
    `Catatan: ${formData.note || "-"}`,
    "",
    "Mohon konfirmasi ketersediaan produk dan ongkos kirim. Terima kasih!"
  ].join("\n");
}

// Event delegation for product and cart controls.
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

cartItemsEl.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) changeQuantity(quantityButton.dataset.id, Number(quantityButton.dataset.qty));
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

$("#cart-open").addEventListener("click", openCart);
$("#cart-close").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
$("#checkout-scroll").addEventListener("click", openCheckout);
$("#checkout-close").addEventListener("click", closeCheckout);

$("#checkout-form").addEventListener("submit", event => {
  event.preventDefault();
  if (cart.length === 0) {
    showToast("Keranjang masih kosong");
    closeCheckout();
    return;
  }

  const formData = Object.fromEntries(new FormData(event.currentTarget).entries());
  const message = buildWhatsAppMessage(formData);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

$("#mobile-menu-button").addEventListener("click", () => {
  const nav = $("#mobile-nav");
  const isExpanded = $("#mobile-menu-button").getAttribute("aria-expanded") === "true";
  nav.classList.toggle("hidden", isExpanded);
  $("#mobile-menu-button").setAttribute("aria-expanded", String(!isExpanded));
});

$("#mobile-nav").addEventListener("click", event => {
  if (event.target.closest("a")) {
    $("#mobile-nav").classList.add("hidden");
    $("#mobile-menu-button").setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeCart();
    closeCheckout();
  }
});

$("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
