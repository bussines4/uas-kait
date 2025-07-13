// script.js
let keranjang = [];

// Saat halaman dimuat, ambil keranjang dari localStorage (jika ada)
document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("keranjang");
  if (data) {
    keranjang = JSON.parse(data);
  }
  tampilkanKeranjang();
});

// Simpan keranjang ke localStorage
function simpanKeranjang() {
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
}

// Tambahkan produk ke keranjang
function tambahKeKeranjang(nama, harga) {
  keranjang.push({ nama, harga });
  simpanKeranjang();
  alert(`${nama} ditambahkan ke keranjang!`);
  tampilkanKeranjang();
}

// Tampilkan isi keranjang (jika elemen tersedia)
function tampilkanKeranjang() {
  const daftar = document.getElementById("daftar-keranjang");
  const total = document.getElementById("total-harga");

  if (!daftar || !total) return;

  daftar.innerHTML = "";
  let totalHarga = 0;

  keranjang.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nama} - Rp ${item.harga.toLocaleString("id-ID")}`;
    daftar.appendChild(li);
    totalHarga += item.harga;
  });

  total.textContent = totalHarga.toLocaleString("id-ID");
}

// Kosongkan isi keranjang
function tampilkanKeranjang() {
  const daftar = document.getElementById("daftar-keranjang");
  const total = document.getElementById("total-harga");

  if (!daftar || !total) return;

  daftar.innerHTML = "";
  let totalHarga = 0;

  keranjang.forEach((item, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><img src="images/${namaKeFile(item.nama)}" alt="${item.nama}"></td>
      <td>${item.nama}</td>
      <td>Rp ${item.harga.toLocaleString("id-ID")}</td>
      <td><button onclick="hapusItem(${index})">Hapus</button></td>
    `;

    daftar.appendChild(tr);
    totalHarga += item.harga;
  });

  total.textContent = totalHarga.toLocaleString("id-ID");
}

function hapusItem(index) {
  keranjang.splice(index, 1);
  simpanKeranjang();
  tampilkanKeranjang();
}

function namaKeFile(nama) {
  const map = {
    "Kemeja": "kemeja.jpeg",
    "Celana": "pants.jpeg",
    "Veterano": "veterano.jpeg",
    "Blocktech": "blocktech.jpeg",
    "Overshirt": "shirt.jpeg"
  };
  return map[nama] || "placeholder.png";
}


// Checkout via WhatsApp
function checkoutWA() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo Admin Man Mode Id, saya ingin memesan:\n\n";
  let totalHarga = 0;

  keranjang.forEach((item) => {
    pesan += `- ${item.nama} (Rp ${item.harga.toLocaleString("id-ID")})\n`;
    totalHarga += item.harga;
  });

  pesan += `\nTotal: Rp ${totalHarga.toLocaleString("id-ID")}`;
  let nomorWA = "6289652355671";
  let url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

  window.open(url, "_blank");
}
