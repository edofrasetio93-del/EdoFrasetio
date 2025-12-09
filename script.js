// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    // Menurunkan threshold agar navbar responsif lebih cepat
    if (window.scrollY > 50) { 
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Hamburger animation
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
});

// Close menu when clicking on link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===== TYPING EFFECT =====
const typingText = document.querySelector('.typing-text');
const texts = [
    'Front-End Developer', // Diperbarui untuk lebih profesional
    'Membuat Website Responsif & Modern',
    'Passionate About Clean Code'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? 50 : 100;
    // Pengecekan agar tidak error jika elemen tidak ditemukan
    if (typingText) {
        setTimeout(type, speed);
    }
}

// Hanya jalankan jika elemen typingText ada
if (typingText) {
    type();
}


// ===== SCROLL ANIMATIONS (Fade In) - Dihapus Progress Bar Logic =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const faders = document.querySelectorAll('.fade-in');

const appearObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, observerOptions);

faders.forEach(fader => {
    appearObserver.observe(fader);
});


// ... (Kode Navbar, Hamburger, Typing Effect, dan Scroll Animation di atas) ...

// ===============================================
// 6. LOGIKA FORMULIR KONTAK (MENGGUNAKAN FORMSPREE)
// ===============================================

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Mencegah reload halaman default

    // Tampilkan status loading
    formStatus.textContent = 'Mengirim pesan...';
    formStatus.style.color = '#ffc107'; // Warna kuning (accent)

    // Mengambil data formulir, termasuk nilai dari atribut 'name'
    const formData = new FormData(contactForm);

    try {
      // Mengirim data ke action URL Formspree
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Sukses
        formStatus.textContent = 'Pesan berhasil terkirim! Terima kasih. 🎉';
        formStatus.style.color = '#007bff'; // Warna biru (primary)
        contactForm.reset(); // Kosongkan formulir
      } else {
        // Gagal (error server Formspree atau validasi)
        const data = await response.json();
        // Menggunakan sintaks template literal yang benar (backticks ``)
        if (data.error) {
          formStatus.textContent = `Gagal mengirim: ${data.error}`; 
        } else {
          formStatus.textContent = 'Gagal mengirim pesan. Coba lagi.';
        }
        formStatus.style.color = 'red';
      }
    } catch (error) {
      // Error koneksi/jaringan
      formStatus.textContent = 'Terjadi kesalahan jaringan. Cek koneksi Anda.';
      formStatus.style.color = 'red';
      console.error('Network Error:', error);
    }

    // Sembunyikan pesan status setelah beberapa detik
    setTimeout(() => {
      formStatus.textContent = '';
    }, 8000);
  });
}