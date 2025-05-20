// LOGIN ADMIN
function loginAdmin(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "admin" && pass === "12345") {
    localStorage.setItem("adminLogin", "true");
    window.location.href = "admin.html";
  } else {
    document.getElementById("loginError").innerText = "Login gagal!";
  }
}

// UPLOAD BERITA
function uploadBerita(e) {
  e.preventDefault();
  if (localStorage.getItem("loginRole") !== "admin") {
    alert("Akses hanya untuk admin. Silakan login.");
    window.location.href = "login.html";
}
  const judul = document.getElementById("judul").value;
  const konten = document.getElementById("konten").value;
  const gambarInput = document.getElementById("gambar");
  const file = gambarInput.files[0];

  const simpanBerita = (imgData) => {
    const beritaBaru = { judul, konten, gambar: imgData || null };
    let beritaList = JSON.parse(localStorage.getItem("beritaList")) || [];
    beritaList.push(beritaBaru);
    localStorage.setItem("beritaList", JSON.stringify(beritaList));

    alert("Berita berhasil disimpan!");
    document.getElementById("judul").value = "";
    document.getElementById("konten").value = "";
    document.getElementById("gambar").value = "";
  };

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      simpanBerita(reader.result); // hasil base64
    };
    reader.readAsDataURL(file);
  } else {
    simpanBerita(null);
  }
}

// TAMPILKAN BERITA
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("beritaList");
  if (container) {
    const beritaList = JSON.parse(localStorage.getItem("beritaList")) || [];
    if (beritaList.length === 0) {
      container.innerHTML = "<p>Tidak ada berita tersedia.</p>";
      return;
    }

    beritaList.reverse().forEach((b, i) => {
      const div = document.createElement("div");
      div.className = "berita";
      div.innerHTML = `
        <h3 style="cursor:pointer; color:#00ccff;" onclick="bukaDetailBerita(${beritaList.length - 1 - i})">${b.judul}</h3>
        ${b.gambar ? `<img src="${b.gambar}" alt="Gambar Berita" style="max-width:100%; border-radius:8px;">` : ""}
        <p>${b.konten.substring(0, 100)}...</p>
        <hr>`;
      container.appendChild(div);
    });
  }
});

// FORM KONTAK SIMULASI
function kirimPesan(e) {
  e.preventDefault();
  document.getElementById("statusPesan").innerText =
    "Pesan Anda telah dikirim! (simulasi)";
  document.getElementById("nama").value = "";
  document.getElementById("email").value = "";
  document.getElementById("pesan").value = "";
}

function bukaDetailBerita(index) {
  localStorage.setItem("beritaTerpilih", index);
  window.location.href = "detail.html";
}

function logoutAdmin() {
  localStorage.removeItem("loginRole");
  localStorage.removeItem("userName");
  window.location.href = "login.html";
}
