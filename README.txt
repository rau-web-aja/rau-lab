RAU LAB STORE — GITHUB PAGES + SUPABASE

FILES
- index.html             Struktur halaman dan konten website
- style.css              Desain dan layout responsif
- script.js              Katalog, keranjang, checkout WhatsApp, Supabase reviews
- images/                Visual konsep hero dan 9 varian produk
- supabase-setup.sql     SQL untuk membuat tabel, RLS, dan Realtime

FITUR
- 9 varian RAU Lab Lip Serum dengan harga yang telah ditentukan
- Layout kartu produk konsisten; hanya gambar, nama, deskripsi, dan harga yang berubah
- Foto konsep lokal untuk setiap produk (tidak bergantung pada URL gambar eksternal)
- Keranjang tersimpan di browser (localStorage)
- Checkout WhatsApp
- Ulasan pelanggan tersimpan di Supabase dan langsung terlihat publik
- Filter ulasan, rating rata-rata, dan pembaruan Realtime
- Tentang brand, pengiriman, retur/refund, FAQ, dan kontak

LANGKAH 1 — BUAT PROJECT SUPABASE
1. Buat project di https://supabase.com dan pilih Free Plan.
2. Pilih region terdekat yang tersedia (misalnya Singapore jika tersedia).
3. Setelah project aktif, buka SQL Editor.
4. Buka file supabase-setup.sql, salin seluruh isinya, lalu jalankan sekali.
5. Pastikan tabel public.reviews berhasil dibuat.

LANGKAH 2 — MASUKKAN KREDENSIAL PUBLIK
1. Di Supabase Dashboard buka Project Settings > API (atau API Keys).
2. Salin Project URL.
3. Salin Publishable key (atau legacy anon/public key).
4. Buka script.js dan ganti dua placeholder ini:
   const SUPABASE_URL = "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";
   const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY_HERE";
5. Simpan file.

PENTING: HANYA gunakan Publishable key atau anon/public key pada website.
JANGAN PERNAH memasukkan service_role key atau secret key ke script.js,
HTML, repository publik, atau browser.

LANGKAH 3 — TEST WEBSITE
1. Buka folder ini di VS Code.
2. Jalankan index.html memakai Live Server.
3. Kirim satu ulasan percobaan.
4. Buka website di browser kedua/incognito. Ulasan harus muncul di sana juga.
5. Cek Supabase > Table Editor > reviews untuk melihat data tersimpan.
6. Hapus ulasan percobaan dari Table Editor jika tidak ingin ditampilkan.

LANGKAH 4 — PUBLISH KE GITHUB PAGES
1. Upload seluruh isi folder rau-lab-store ke root repository GitHub (termasuk folder images dan SQL file).
2. Commit dan push ke branch main.
3. Buka repository Settings > Pages.
4. Pilih Deploy from a branch > main > /(root) > Save.

KONFIGURASI ADMIN
Nomor WhatsApp admin saat ini: 6281234567890
Jika nomor berubah, ubah WHATSAPP_NUMBER di script.js dan tautan WhatsApp di index.html.

CATATAN ULASAN
- Ulasan dipublikasikan langsung tanpa moderasi setelah dikirim.
- Siapa pun dapat mengirim ulasan; sistem ini belum memverifikasi pembelian.
- Batasi spam sebelum promosi besar. Untuk produksi, tambahkan CAPTCHA / proteksi server-side dan verifikasi order jika diperlukan.
- RLS hanya memberi akses SELECT dan INSERT ke role publik; pengunjung tidak diberi akses UPDATE/DELETE.
- Batas tampilan di website adalah 100 ulasan terbaru.

CATATAN FOTO PRODUK
Gambar dalam folder images adalah visual konsep hasil generasi AI untuk mockup website,
bukan foto produk fisik yang diverifikasi. Pastikan kemasan, warna, dan bentuk sesuai
produk sebenarnya sebelum digunakan sebagai foto jualan resmi.
