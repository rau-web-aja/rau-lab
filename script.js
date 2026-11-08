const products = [
    { id: 1, name: "RAU Lab Original Clear", desc: "Pelembap murni transparan tanpa warna.", price: 35000, img: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300" },
    { id: 2, name: "RAU Lab Rose Pink", desc: "Rona pink alami segar merona.", price: 35000, img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300" },
    { id: 3, name: "RAU Lab Peach Nude", desc: "Warna peach natural no-makeup look.", price: 35000, img: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=300" },
    { id: 4, name: "RAU Lab Cherry Red", desc: "Warna merah ceri bold & elegan.", price: 35000, img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300" },
    { id: 5, name: "RAU Lab Honey Glow", desc: "Ekstra madu untuk bibir sangat kering.", price: 35000, img: "https://images.unsplash.com/photo-1599733589046-10c005739ef9?w=300" },
    { id: 6, name: "RAU Lab Berry Plump", desc: "Antioksidan berry untuk bibir kenyal.", price: 35000, img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300" },
    { id: 7, name: "RAU Lab Coffee Scrub", desc: "Infused kopi untuk merawat bibir gelap.", price: 35000, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300" },
    { id: 8, name: "RAU Lab Mint Fresh", desc: "Sensasi mint dingin menyegarkan.", price: 35000, img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300" },
    { id: 9, name: "RAU Lab Golden Gleam", desc: "Micro-shimmer kilau elegan.", price: 35000, img: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=300" }
];

let cart = [];

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
            <div class="price">Rp ${p.price.toLocaleString()}</div>
            <button class="btn-add" onclick="addToCart(${p.id})">+ Masuk Keranjang</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    updateCart();
    alert(product.name + " berhasil ditambahkan ke keranjang!");
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.reduce((sum, i) => sum + i.qty, 0);
    const itemsContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        itemsContainer.innerHTML = "<p>Keranjang masih kosong.</p>";
        document.getElementById('total-price').innerText = "0";
        return;
    }
    let total = 0;
    itemsContainer.innerHTML = cart.map(i => {
        total += i.price * i.qty;
        return `<div class="cart-item"><span>${i.name} (x${i.qty})</span><span>Rp ${(i.price * i.qty).toLocaleString()}</span></div>`;
    }).join('');
    document.getElementById('total-price').innerText = total.toLocaleString();
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function checkoutWA() {
    if (cart.length === 0) {
        alert("Keranjang kamu masih kosong!");
        return;
    }
    let text = "Halo Admin RAU Lab, saya ingin memesan produk berikut dari website:\n\n";
    cart.forEach(i => {
        text += `- ${i.name} (x${i.qty}) = Rp ${(i.price * i.qty).toLocaleString()}\n`;
    });
    let total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    text += `\nTotal Belanja: Rp ${total.toLocaleString()}\nMohon informasi pembayaran dan pengirimannya. Terima kasih!`;
    
    let phone = "6281234567890"; // Ganti nomor WhatsApp kamu
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`, '_blank');
}

renderProducts();