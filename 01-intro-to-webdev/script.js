// ---- BAGIAN UNTUK INDEX.HTML ----
const btn = document.getElementById("helloBtn");
const msg = document.getElementById("message");

if (btn && msg) {
    btn.addEventListener("click", () => {
        msg.textContent = "Halo! Kamu baru saja menekan tombol 🎉";
    });
}


// ---- BAGIAN UNTUK FORM.HTML ----
const form = document.getElementById("myForm");
const nameInput = document.getElementById("nameInput");
const output = document.getElementById("output");

if (form && nameInput && output) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        output.textContent = "Halo, " + nameInput.value + "!";
    });
}
