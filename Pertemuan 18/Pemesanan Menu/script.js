let keranjang = [];
let total = 0;

function tambahItem(nama, harga) {
    keranjang.push({nama, harga});
    updateTampilan();
}

function updateTampilan() {
    const listElement = document.getElementById('cart-list');
    const totalElement = document.getElementById('total-harga');
    
    // Reset list
    listElement.innerHTML = '';
    total = 0;

    if (keranjang.length === 0) {
        listElement.innerHTML = '<p style="color: #888; text-align: center;">Belum ada pesanan</p>';
    } else {
        keranjang.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <span>${item.nama}</span>
                <span>Rp ${item.harga.toLocaleString()}</span>
            `;
            listElement.appendChild(div);
            total += item.harga;
        });
    }

    totalElement.innerText = 'Rp ' + total.toLocaleString();
}

function checkout() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
    } else {
        alert("Pesanan diterima! Total: Rp " + total.toLocaleString() + "\nTerima kasih sudah memesan.");
        keranjang = [];
        updateTampilan();
    }
}